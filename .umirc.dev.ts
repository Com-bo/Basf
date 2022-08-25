export default {
  define: {
    'process.env.host': 'https://serviceme.sharepoint.com',
    // 'process.env.relativePath': '/sites/DPA_DEV_Community/LevelRequest',
    // 'process.env.taskRelativePath': '/sites/DPA_DEV_Community/LevelRequest',
    'process.env.relativePath': '/sites/Gate2Digital',
    'process.env.taskRelativePath': '/sites/Gate2Digital',
    'process.env.token':
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL3NlcnZpY2VtZS5zaGFyZXBvaW50LmNvbS8iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC80NGMyNGY0Mi1kNDliLTQxOTItOTMzNi01ZjI5ODliODczNTYvIiwiaWF0IjoxNjYxNDExMzgzLCJuYmYiOjE2NjE0MTEzODMsImV4cCI6MTY2MTQxNjQ5MiwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQVZ5c3pJd0JrRjBvU3BNckxJQXVUWDl6T0ZaMnNKY0tOK0hobkQvZHFlM1NFeHFxenVuaTB5c1NZamlHdFVXVmwiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IndvcmstZmxvdyIsImFwcGlkIjoiMzM5ZDQzYzAtYzYxZC00YmQwLWE5M2ItMjA5NGIzNjVjMGM3IiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJGYW5nIiwiZ2l2ZW5fbmFtZSI6IlFpbmciLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiI1OC4yMTQuMjM2LjM2IiwibmFtZSI6IlFpbmcgRmFuZyIsIm9pZCI6IjZhNzUwNWVlLTAwMGYtNDg5ZS1hMWU0LTA5MTY4NWZkYjBhOCIsInB1aWQiOiIxMDAzMjAwMDQzQTAyQURDIiwicmgiOiIwLkFWWUFRa19DUkp2VWtrR1RObDhwaWJoelZnTUFBQUFBQVBFUHpnQUFBQUFBQUFCV0FLOC4iLCJzY3AiOiJBbGxTaXRlcy5GdWxsQ29udHJvbCBBbGxTaXRlcy5NYW5hZ2UgQWxsU2l0ZXMuUmVhZCBBbGxTaXRlcy5Xcml0ZSBDYWxlbmRhcnMuUmVhZCBDb250YWN0cy5SZWFkIE1haWwuUmVhZCBQcmVzZW5jZS5SZWFkIFByZXNlbmNlLlJlYWQuQWxsIFVzZXIuUmVhZCBVc2VyLlJlYWQuQWxsIFVzZXIuUmVhZFdyaXRlIFVzZXIuUmVhZFdyaXRlLkFsbCIsInNpZCI6ImU4YjMyYzAwLTY4YjUtNGY2My1hNmQ1LTNlMmE0MDM0MDJiNyIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6Im5zbHUwUkRJclF3V3piRjRBeG9lV0NZWW1jX0xIZVlHcDg4Q2VnemNqTlkiLCJ0aWQiOiI0NGMyNGY0Mi1kNDliLTQxOTItOTMzNi01ZjI5ODliODczNTYiLCJ1bmlxdWVfbmFtZSI6InFpbmcuZmFuZ0BzZXJ2aWNlbWUub25taWNyb3NvZnQuY29tIiwidXBuIjoicWluZy5mYW5nQHNlcnZpY2VtZS5vbm1pY3Jvc29mdC5jb20iLCJ1dGkiOiJEaUtTak1jUVhFaW9YRjlhdTBZWUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyI0NDM2NzE2My1lYmExLTQ0YzMtOThhZi1mNTc4Nzg3OWY5NmEiLCIxNThjMDQ3YS1jOTA3LTQ1NTYtYjdlZi00NDY1NTFhNmI1ZjciLCI0NWQ4ZDNjNS1jODAyLTQ1YzYtYjMyYS0xZDcwYjVlMWU4NmUiLCJmMjhhMWY1MC1mNmU3LTQ1NzEtODE4Yi02YTEyZjJhZjZiNmMiLCJjZjFjMzhlNS0zNjIxLTQwMDQtYTdjYi04Nzk2MjRkY2VkN2MiLCI1YzRmOWRjZC00N2RjLTRjZjctOGM5YS05ZTQyMDdjYmZjOTEiLCJhOWVhODk5Ni0xMjJmLTRjNzQtOTUyMC04ZWRjZDE5MjgyNmMiLCI2OTA5MTI0Ni0yMGU4LTRhNTYtYWE0ZC0wNjYwNzViMmE3YTgiLCJlNmQxYTIzYS1kYTExLTRiZTQtOTU3MC1iZWZjODZkMDY3YTciLCIxNzMxNTc5Ny0xMDJkLTQwYjQtOTNlMC00MzIwNjJjYWNhMTgiLCI5YzZkZjBmMi0xZTdjLTRkYzMtYjE5NS02NmRmYmQyNGFhOGYiLCI4OTJjNTg0Mi1hOWE2LTQ2M2EtODA0MS03MmFhMDhjYTNjZjYiLCIyOTIzMmNkZi05MzIzLTQyZmQtYWRlMi0xZDA5N2FmM2U0ZGUiLCI5Yjg5NWQ5Mi0yY2QzLTQ0YzctOWQwMi1hNmFjMmQ1ZWE1YzMiLCI3NDk1ZmRjNC0zNGM0LTRkMTUtYTI4OS05ODc4OGNlMzk5ZmQiLCJjNDMwYjM5Ni1lNjkzLTQ2Y2MtOTZmMy1kYjAxYmY4YmI2MmEiLCJiMWJlMWMzZS1iNjVkLTRmMTktODQyNy1mNmZhMGQ5N2ZlYjkiLCJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXX0.NCFq0Gv39vn1XXiKHJ5_kOP-dw_UbhzDT7qTdQI4OADL7Z9j85z8OTIQ8pxOwOkM_JcLAydQuaYNFgQF6TlEuRAHdqIqKsPK8HPLK4d4UBmMq_PajurDXdQcFFcfY1q7D11XrJZFqELVdAj9F_Z05TtAGGyfCnXf-KMMu31C5jXyySIkbiU5LyeBAu-N98WY1MyWPE2HaOvkG_ng6HCeSydLoYzA6yXL1Ro4yRC9rEEaUp8cGh6o9ObJSKhUeO883WOhmoEZw0hN9JCKNmXWKZesX8dKZG9ncjd3i2cqU9AOlUlDEdk_xmQHJPp7Xk-Eaw6iYTbAgch79E9NNBlUzA',
  },
};
