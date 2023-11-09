<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://www.nseindia.com/api/option-chain-indices?symbol=BANKNIFTY',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_HTTPHEADER => array(
    'Cookie: ak_bmsc=9D3E6B349C3B6999EFF121C3403346EB~000000000000000000000000000000~YAAQt/Y3F1V7Oa2LAQAAH53prRUd4bQQKKROmJuJ51pQ075Q0Ab2G0KUcyxHR3LGw8QUkPO7o9YwYx0fQ5Zksf5ifqEfIw16hnUFj5aO8glcLAGB/64b6hyKM2v9T/aji3NGciztZAR5WQr07SjBDtnMYaXLA6zxqKFmclDaTBdmlK1j8UCk8ejga4idErxhCtYhy5kRPGKnoauqurIt+OahCNzZcF+SNm5ImaZc5ZLnP5sQFe692RTlXffGQ8Y4bKPRBqCLI7s3ieFOV9VuG1fAf+neMHy8OzXbxl0CS6wUULsc1KwTW/LSXpUKJEro9Lf0ZfZAnjx4K+qF0VMNe4SSIbRcO9HmXsld0BWP+ZFxxU2ekMfFhU1eyquitA=='
  ),
));

$response = curl_exec($curl);

curl_close($curl);
//var_dump(json_decode($response, true));
echo json_encode($response, true);
