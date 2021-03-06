/*
  senseBox Citizen Sensingplatform
  WiFi Version: 1.2
  Date: 2017-02-28
  Homepage: http://www.sensebox.de
  Author: Institute for Geoinformatics, University of Muenster
  Note: Sketch for SB-Home WiFi Edition
  Code is in the public domain.
*/

#include <avr/wdt.h>
#include "BMP280.h"
#include <Wire.h>
#include <HDC100X.h>
#include <SPI.h>
#include <WiFi101.h>
#include <Makerblog_TSL45315.h>

//Custom WiFi Parameters
const char ssid[] = "";       //  your network SSID (name)
const char pass[] = "";       // your network password

//Network settings
@-- tmpl postDomain // const char *server = "";
uint8_t status = WL_IDLE_STATUS;
WiFiClient client;

//Sensor Instances
Makerblog_TSL45315 TSL = Makerblog_TSL45315(TSL45315_TIME_M4);
HDC100X HDC(0x43);
BMP280 BMP;

//measurement variables
#define UV_ADDR 0x38
#define IT_1   0x1
double tempBaro, pressure;
char result;

typedef struct sensor {
  const uint8_t ID[12];
} sensor;

uint8_t sensorsIndex = 0;

@-- tmpl ctSensors

@-- tmpl IDs

uint8_t contentLength = 0;

float values[NUM_SENSORS];

void addValue(const float &value) {
  values[sensorsIndex] = value;
  sensorsIndex = sensorsIndex + 1;
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

int printHexToStream(const uint8_t *data, uint8_t length, Print &stream) // prints 8-bit data in hex
{
 byte first;
 int j = 0;
 for (uint8_t i=0; i<length; i++) {
   first = (data[i] >> 4) | 48;
   if (first > 57) {
     stream.write(first + (byte)39);
   } else {
     stream.write(first);
   }
   j++;

   first = (data[i] & 0x0F) | 48;
   if (first > 57) {
     stream.write(first + (byte)39);
   } else {
     stream.write(first);
   }
   j++;
 }
 return j;
}

int printCsvToStream(Print &stream) {
  int len = 0;
  for (uint8_t i = 0; i < sensorsIndex; i++) {
    if (!isnan(values[i])) {
      len = len + printHexToStream(sensors[i].ID, 12, stream);
      len = len + stream.print(",");
      //do not print digits for illuminance und uv-intensity
      if (i < 3) len = len + stream.println(values[i]);
      else len = len + stream.println(values[i],0);
    }
  }
  return len;
}


// millis() rollover fix - http://arduino.stackexchange.com/questions/12587/how-can-i-handle-the-millis-rollover
void sleep(unsigned long ms) {            // ms: duration
  unsigned long start = millis();         // start: timestamp
  for (;;) {
    unsigned long now = millis();         // now: timestamp
    unsigned long elapsed = now - start;  // elapsed: duration
    if (elapsed >= ms)                    // comparing durations: OK
      return;
  }
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

  Serial.print("Server Response: "); Serial.print(response);

  client.flush();
  client.stop();
}

void submitValues() {
  // close any connection before send a new request.
  // This will free the socket on the WiFi shield
  Serial.println("__________________________\n");
  if (client.connected()) {
    client.stop();
    sleep(1000);
  }
  // if there's a successful connection:
  if (client.connect(server, 80)) {

    Serial.println("connecting...");
    // send the HTTP POST request:

    client.print(F("POST /boxes/"));
    printHexToStream(SENSEBOX_ID, 12, client);
    client.println(F("/data HTTP/1.1"));

    // !!!!! DO NOT REMOVE !!!!!
    // !!!!! NICHT LÖSCHEN !!!!!
    // print once to Serial to get the content-length
    int contentLen = printCsvToStream(Serial);
    // !!!!! DO NOT REMOVE !!!!!
    // !!!!! NICHT LÖSCHEN !!!!!

    // Send the required header parameters
    client.print(F("Host: "));
    client.println(server);
    client.print(F("Content-Type: text/csv\nConnection: close\nContent-Length: "));
    client.println(contentLen);
    client.println();
    printCsvToStream(client);
    client.println();
    Serial.println("done!");

    waitForResponse();

    // reset index
    sensorsIndex = 0;

  }
  else {
    // if you couldn't make a connection:
    Serial.println("connection failed. Restarting System.");
    sleep(5000);
    asm volatile (" jmp 0");
  }
}

void setup() {
  //Initialize serial and wait for port to open:
  Serial.begin(9600);
  //Enable Wifi Shield
  pinMode(4, INPUT);
  digitalWrite(4, HIGH);
  sleep(2000);
  //Check WiFi Shield status
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    // don't continue:
    while (true);
  }
  // attempt to connect to Wifi network:
  while ( status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network. Change this line if using open or WEP network
    status = WiFi.begin(ssid, pass);
    // wait 60 seconds for connection:
    Serial.println();
    Serial.print("Waiting 10 seconds for connection...");
    sleep(10000);
    Serial.println("done.");
  }
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
  Serial.println("Starting loop.");
  HDC.getTemp();
}

void loop() {
  addValue(HDC.getTemp());
  sleep(200);
  addValue(HDC.getHumi());
  result = BMP.startMeasurment();
  if (result != 0) {
    sleep(result);
    result = BMP.getTemperatureAndPressure(tempBaro, pressure);
  }
  addValue(pressure);
  addValue(TSL.readLux());
  addValue(getUV());

  submitValues();

  sleep(60000);
}

