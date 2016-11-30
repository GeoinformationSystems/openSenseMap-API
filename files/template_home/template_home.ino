/*
  senseBox Home - Citizen Sensingplatform
  Version: 2.3
  Date: 2016-Nov-29
  Homepage: https://www.sensebox.de https://www.opensensemap.org
  Author: Institute for Geoinformatics, University of Muenster
  Note: Sketch for senseBox:home
  Email: support@sensebox.de
*/

#include <Wire.h>
#include "HDC100X.h"
#include "BMP280.h"
#include <Makerblog_TSL45315.h>
#include <SPI.h>
#include <Ethernet.h>

//Upload interval in milliseconds
const unsigned int postingInterval = 60000;

//Configure static IP setup (only needed if DHCP is disabled)
IPAddress myIp(192, 168, 0, 177);
IPAddress myDns(192, 168, 0, 1);
IPAddress myGateway(192, 168, 0, 1);
IPAddress mySubnet(255, 255, 255, 0);

//Ethernet configuration
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
char server[] = "@@OSEM_POST_DOMAIN@@";

// ------------------------------------------------------
// ------------------ CUSTOM SETTINGS -------------------
// -- Do not change unless you know what you're doing. --
// ------------------------------------------------------

//senseBox ID

//Sensor IDs

// Always keep this number equal to the sensor ids you have above this comment
const unsigned int phenomena = 5; //total count of measured phenomena

EthernetClient client;

//Load sensors
Makerblog_TSL45315 TSL = Makerblog_TSL45315(TSL45315_TIME_M4);
HDC100X HDC(0x43);
BMP280 BMP;

//measurement variables
float temperature = 0;
float humidity = 0;
double tempBaro, pressure = 0;
uint32_t lux = 0;
uint16_t uv = 0;
int count = 1;
char result;
#define UV_ADDR 0x38
#define IT_1   0x1


void setup() {
  sleep(1000);
  Serial.begin(9600);
  Serial.println();
  Serial.println("senseBox Home software version 2.3");
  Serial.println();
  sleep(1000);
  ethernetConnect(); // start the Ethernet connection
  initSensors(); // initialize the sensors
  Serial.println("Starting loop.\n");
}

void loop() {
  switch (count) {
    case 1: //-----Temperature-----//
      Serial.print("Temperature: ");
      temperature = HDC.getTemp();
      postMeasurement(TEMPSENSOR_ID, temperature, 2);
      break;
    case 2: //-----Humidity-----//
      Serial.print("Humidity: ");
      humidity = HDC.getHumi();
      postMeasurement(HUMISENSOR_ID, humidity, 2);
      break;
    case 3: //-----Pressure-----//
      Serial.print("Pressure: ");
      result = BMP.startMeasurment();
      if (result != 0) {
        sleep(10);
        result = BMP.getTemperatureAndPressure(tempBaro, pressure);
        postMeasurement(PRESSURESENSOR_ID, pressure, 2);
      }
      break;
    case 4: //-----Illuminance-----//
      Serial.print("Illuminance: ");
      lux = TSL.readLux();
      postMeasurement(LUXSENSOR_ID, lux, 0);
      break;
    case 5: //-----UV Light-----//
      Serial.print("UV intesity: ");
      uv = getUV();
      postMeasurement(UVSENSOR_ID, uv, 0);
      break;
  }
  sleep(postingInterval);
}

void ethernetConnect(){
  Serial.print("Initializing DHCP connection...");
  if (Ethernet.begin(mac) == 0) {
    Serial.println("failed! Trying static IP setup.");
    Ethernet.begin(mac, myIp, myDns, myGateway, mySubnet);
    //@TODO: Add reference to support site for network settings
  }
  else {
    Serial.println("done!");
  }
  sleep(1000);
}

void initSensors(){
  Serial.print("Initializing sensors...");
  Wire.begin();
  Wire.beginTransmission(UV_ADDR);
  Wire.write((IT_1 << 2) | 0x02);
  Wire.endTransmission();
  sleep(500);
  HDC.begin(HDC100X_TEMP_HUMI, HDC100X_14BIT, HDC100X_14BIT, DISABLE);
  TSL.begin();
  BMP.begin();
  BMP.setOversampling(4);
  Serial.println("done!");
  temperature = HDC.getTemp();
}

void postMeasurement(String sensorId, float measurement, int decimals) {
  //convert float to string
  char obs[10];
  dtostrf(measurement, 5, decimals, obs); //dtostrf(double __val,signed char __width,unsigned char __prec,char *__s)
  //json object must look like: {"value":"12.5"}
  String value = "{\"value\":";
  value += obs;
  value += "}";
  Serial.println(value);
  //connect to OSeM and HTTP POST data
  Serial.print("Connecting to server...");
  if (client.connect(server, 8000)) {
    Serial.println("connected.\n");
    // perform HTTP POST request to: osem.org:8000/boxes/boxId/sensorId
    client.print("POST /boxes/");
    client.print(SENSEBOX_ID);
    client.print("/");
    client.print(sensorId);
    client.println(" HTTP/1.1");
    // send required header parameters
    client.print("Host:");
    client.println(server);
    client.println("Content-Type: application/json");
    client.println("Connection: close");
    client.print("Content-Length: ");
    client.println(value.length());
    client.println();
    // Send the json object
    client.print(value);
    client.println();

    if (count < phenomena) count++;
    else count = 1;

    waitForResponse();
  }
  else {
    Serial.println("connection to server failed. Restarting system in 5 seconds...");
    sleep(5000);
    software_Reset();
  }
  Serial.println("___________________________________\n");
}


void waitForResponse()
{
  // if there are incoming bytes from the server, read and print them
  sleep(100);
  String response = "";
  char c;
  boolean repeat = true;
  do {
    if (client.available()) c = client.read();
    else repeat = false;
    response += c;
    if (response == "HTTP/1.1 ") response = "";
    if (c == '\n') repeat = false;
  }
  while (repeat);

  Serial.print("Server Response: "); Serial.println(response);
  client.stop();
}

uint16_t getUV() {
  byte msb = 0, lsb = 0;
  uint16_t uvValue;

  Wire.requestFrom(UV_ADDR + 1, 1); //MSB
  sleep(1);
  if (Wire.available()) msb = Wire.read();

  Wire.requestFrom(UV_ADDR + 0, 1); //LSB
  sleep(1);
  if (Wire.available()) lsb = Wire.read();

  uvValue = (msb << 8) | lsb;

  return uvValue * 5;
}

// millis() rollover fix - http://arduino.stackexchange.com/questions/12587/how-can-i-handle-the-millis-rollover
void sleep(unsigned long ms) {
  unsigned long start = millis();
  for (;;) {
    unsigned long now = millis();
    unsigned long elapsed = now - start;
    if (elapsed >= ms)
      return;
  }
}

// Restarts program from beginning but does not reset the peripherals and registers - http://forum.arduino.cc/index.php?topic=49581.0
void software_Reset(){
  asm volatile ("  jmp 0");
}