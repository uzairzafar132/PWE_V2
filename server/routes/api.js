const router = require('express').Router();
const superagent = require('superagent');
const { createProxyMiddleware } = require('http-proxy-middleware');
var request = require('request');
var axios = require('axios');

router.route('/').post((req,res)=>{
  
    createProxyMiddleware({target: 'https://auth.flexbooker.com/connect/token',changeOrigin: true });
    
          
    
    });



    router.route('/Appointment/:allowOverbooking').put((req,res)=>{
        console.log("sendign data");
 
        var data = JSON.stringify({
            "id": 5516248,
            "confirmationGuid": "7ef97e5a-a2c5-4d69-b1c5-f1346b91227b",
            "merchantGuid": "f767bcce-1bc6-4d5f-b21f-0fe8db906db1",
            "employeeId": 80488,
            "secondEmployeeId": 0,
            "serviceIds": [
              36832
            ],
            "duration": 20,
            "appointmentDateTime": "2022-09-12T03:30:00Z",
            "firstName": "David",
            "lastName": "Davis",
            "email": "1david.davis@gmail.com",
            "phone": "6199882670",
            "remindByEmail": true,
            "remindBySms": true,
            "timeZone": "Pacific Standard Time",
            "price": "$0.00",
            "noShowFee": false,
            "creditCardMask": null,
            "notes": null,
            "customStatusId": null,
            "noShowCharged": false,
            "chargeRefunded": false,
            "customBookingFields": [
              {
                "merchantFieldId": 7737,
                "value": "Mira Mesa"
              },
              {
                "merchantFieldId": 12891,
                "value": "DBQ Evaluation"
              },
              {
                "merchantFieldId": 12772,
                "value": "California"
              },
              {
                "merchantFieldId": 12773,
                "value": "lemon grove"
              },
              {
                "merchantFieldId": 7732,
                "value": "91945"
              },
              {
                "merchantFieldId": 7723,
                "value": "Hip - left hip osteoarthritis with thigh impairment"
              },
              {
                "merchantFieldId": 7724,
                "value": "Knee - left knee patellofemoral pain syndrome"
              },
              {
                "merchantFieldId": 13394,
                "value": "08/10/2022"
              },
              {
                "merchantFieldId": 7745,
                "value": "8/17/2022"
              },
              {
                "merchantFieldId": 10354,
                "value": "79418"
              },
              {
                "merchantFieldId": 12892,
                "value": "7/28/1983"
              },
              {
                "merchantFieldId": 12774,
                "value": "5e4e8712-fd91-11ec-a867-0269333daa7d"
              },
              {
                "merchantFieldId": 13878,
                "value": "test999tttt"
              },
              {
                "merchantFieldId": 7725,
                "value": null
              },
              {
                "merchantFieldId": 7726,
                "value": null
              },
              {
                "merchantFieldId": 7727,
                "value": null
              },
              {
                "merchantFieldId": 7728,
                "value": null
              },
              {
                "merchantFieldId": 7729,
                "value": null
              },
              {
                "merchantFieldId": 7730,
                "value": null
              },
              {
                "merchantFieldId": 13510,
                "value": null
              },
              {
                "merchantFieldId": 13511,
                "value": null
              }
            ],
            "cancelled": false,
            "cancellationReason": null,
            "customerNotes": null,
            "noShow": false,
            "madeByMerchant": false,
            "madeOnDate": "8/18/2022 7:44 AM",
            "storedPaymentMask": "",
            "amountPaid": "",
            "locationId": 16146,
            "internalSummary": null,
            "queryString": null,
            "scheduleType": 0,
            "fixedTimeScheduleSessionSlug": null,
            "numberOfSlots": 0,
            "otherParticipants": null,
            "conferenceUrl": null,
            "conferenceInfo": null,
            "isSeries": false,
            "periodStep": 0,
            "periodType": null,
            "recurrences": 0
          });
          
          var config = {
            method: 'put',
            url: 'https://merchant-api.flexbooker.com/Appointment/allowOverbooking=true',
            headers: { 
              'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjcwREY0N0MxMDNEOTYwMzhENDM3OUNCOTUzQTIyOTI3MjlCRjcwRTAiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJjTjlId1FQWllEalVONXk1VTZJcEp5bV9jT0EifQ.eyJuYmYiOjE2NjM2NzYwNDMsImV4cCI6MTY2MzY3OTY0MywiaXNzIjoiaHR0cHM6Ly9hdXRoLmZsZXhib29rZXIuY29tIiwiYXVkIjpbImh0dHBzOi8vYXV0aC5mbGV4Ym9va2VyLmNvbS9yZXNvdXJjZXMiLCJmbGV4Ym9va2VyQXBpIl0sImNsaWVudF9pZCI6ImxocHBnNmxyNzgiLCJjbGllbnRfbWlkIjoiZjc2N2JjY2UtMWJjNi00ZDVmLWIyMWYtMGZlOGRiOTA2ZGIxIiwiY2xpZW50X3N0b2siOiI5MzgxM2NlZS02OTlhLTRmNzktOGI1ZC05NjE0MzQwOGE2N2IiLCJzY29wZSI6WyJmbGV4Ym9va2VyQXBpIl19.ABhkG7tlJrfSyLANYWZ3VXUx5aPDywqEj_rNp4xxHGENx3JVnwVnPodO7TJHLfA7Gi4xDJSeVdsMC1RNWmrXB_dG3K-T14VJHZ9YN71CsEuu_OOMAeW77HnppphMHMrwCgHgmBQdr4dqypDdO0fyEEjZh1qEQXfOiz_gCwb5gXr4XQ2IqBAo6zP-9-O8GeHnhMIbSN8N9LlYVYm4tngKbMTj7ZfUTEl4pcWxagfyAg9Kj69a_CV8I4kwMSHWqbNdkTmFrdbv_k_hXiYw99MHnoAxU1P3gYNMBVjU8c4YOP72qash5LF3yrM7SbcpWVznf8eZRm0vEPO0RDcZ3QANOS3vJ3D10eT1pCi1fz70LlurjjsSvevMQYIw5N7JNP_uGgDsSCopW3hWd9ggeKcEPKbFgCvU8kbtmqedYwDmihjEjP3DLz8glwS2v2fD1Tv98qKhDXiNgqgk6EQJYYxIdcfPy0zIDt0iIpDeqIeW-HIv0SqAXzjaQxoeaFTSCbKI4QG4VXEsKrsKUDfNYtRcbcsCDDBkUwCxNCnZeESSKuKgy-b_wJfkIibXcpnBg4GzubdrFSSpN2f8SKZxOFAodtK-3dE31llvJHQCpfn0a-mGCiEWXqWOG8eC_CO3PwDz31k-5Vge97_wudNBZvOgPODgxsbSDUNDYBke7OnpHJE', 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log("Successful")
            console.log(JSON.stringify(response.data));
            res.send("Successfull");
          })
          .catch(function (error) {
            console.log(error);
            res.send("Error");
          });
        });
    
module.exports = router;