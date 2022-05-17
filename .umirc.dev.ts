export default {
  define: {
    'process.env.host': 'https://serviceme.sharepoint.com',
    'process.env.relativePath': '/sites/DPA_DEV_Community/LevelRequest',
    'process.env.taskRelativePath': '/sites/DPA_DEV_Community',
    'process.env.token':
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyIsImtpZCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyJ9.eyJhdWQiOiJodHRwczovL3NlcnZpY2VtZS5zaGFyZXBvaW50LmNvbS8iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC80NGMyNGY0Mi1kNDliLTQxOTItOTMzNi01ZjI5ODliODczNTYvIiwiaWF0IjoxNjUyMzU1MTQ3LCJuYmYiOjE2NTIzNTUxNDcsImV4cCI6MTY1MjM2MDY1OSwiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhUQUFBQWdxQ0ZlVTV1MjRqaERKZ1VuRkxUNk45dzdlNWpPWG00MXM5cDQ0Yk4xQjg2Y3czK1ZZZnBoMVplZW1HOUVRYW1hc3VndTBucXNEQ0wvRUVBaVI4WjVLZGIzY1E1M0piamQzV1h2eUVIeUxZPSIsImFtciI6WyJwd2QiXSwiYXBwX2Rpc3BsYXluYW1lIjoid29yay1mbG93IiwiYXBwaWQiOiIzMzlkNDNjMC1jNjFkLTRiZDAtYTkzYi0yMDk0YjM2NWMwYzciLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6IkZhbmciLCJnaXZlbl9uYW1lIjoiUWluZyIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjU4LjIxNC4yMzYuMzYiLCJuYW1lIjoiUWluZyBGYW5nIiwib2lkIjoiNmE3NTA1ZWUtMDAwZi00ODllLWExZTQtMDkxNjg1ZmRiMGE4IiwicHVpZCI6IjEwMDMyMDAwNDNBMDJBREMiLCJyaCI6IjAuQVZZQVFrX0NSSnZVa2tHVE5sOHBpYmh6VmdNQUFBQUFBUEVQemdBQUFBQUFBQUJXQUs4LiIsInNjcCI6IkFsbFNpdGVzLkZ1bGxDb250cm9sIEFsbFNpdGVzLk1hbmFnZSBBbGxTaXRlcy5SZWFkIEFsbFNpdGVzLldyaXRlIENhbGVuZGFycy5SZWFkIENvbnRhY3RzLlJlYWQgTWFpbC5SZWFkIFByZXNlbmNlLlJlYWQgUHJlc2VuY2UuUmVhZC5BbGwgVXNlci5SZWFkIFVzZXIuUmVhZC5BbGwgVXNlci5SZWFkV3JpdGUgVXNlci5SZWFkV3JpdGUuQWxsIiwic2lkIjoiZWM2NjY4ZTAtY2U4ZC00ZTY0LWI3MTUtZTRkOTM2N2QwY2Q1Iiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoibnNsdTBSRElyUXdXemJGNEF4b2VXQ1lZbWNfTEhlWUdwODhDZWd6Y2pOWSIsInRpZCI6IjQ0YzI0ZjQyLWQ0OWItNDE5Mi05MzM2LTVmMjk4OWI4NzM1NiIsInVuaXF1ZV9uYW1lIjoicWluZy5mYW5nQHNlcnZpY2VtZS5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJxaW5nLmZhbmdAc2VydmljZW1lLm9ubWljcm9zb2Z0LmNvbSIsInV0aSI6Im9aY2dvbXI3aEUteERlc3Z3bllzQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjQ0MzY3MTYzLWViYTEtNDRjMy05OGFmLWY1Nzg3ODc5Zjk2YSIsIjE5NGFlNGNiLWIxMjYtNDBiMi1iZDViLTYwOTFiMzgwOTc3ZCIsIjE1OGMwNDdhLWM5MDctNDU1Ni1iN2VmLTQ0NjU1MWE2YjVmNyIsIjQ1ZDhkM2M1LWM4MDItNDVjNi1iMzJhLTFkNzBiNWUxZTg2ZSIsImYyOGExZjUwLWY2ZTctNDU3MS04MThiLTZhMTJmMmFmNmI2YyIsImNmMWMzOGU1LTM2MjEtNDAwNC1hN2NiLTg3OTYyNGRjZWQ3YyIsIjVmMjIyMmIxLTU3YzMtNDhiYS04YWQ1LWQ0NzU5ZjFmZGU2ZiIsIjVjNGY5ZGNkLTQ3ZGMtNGNmNy04YzlhLTllNDIwN2NiZmM5MSIsImE5ZWE4OTk2LTEyMmYtNGM3NC05NTIwLThlZGNkMTkyODI2YyIsIjY5MDkxMjQ2LTIwZTgtNGE1Ni1hYTRkLTA2NjA3NWIyYTdhOCIsImU2ZDFhMjNhLWRhMTEtNGJlNC05NTcwLWJlZmM4NmQwNjdhNyIsIjE3MzE1Nzk3LTEwMmQtNDBiNC05M2UwLTQzMjA2MmNhY2ExOCIsIjljNmRmMGYyLTFlN2MtNGRjMy1iMTk1LTY2ZGZiZDI0YWE4ZiIsIjg5MmM1ODQyLWE5YTYtNDYzYS04MDQxLTcyYWEwOGNhM2NmNiIsIjI5MjMyY2RmLTkzMjMtNDJmZC1hZGUyLTFkMDk3YWYzZTRkZSIsIjliODk1ZDkyLTJjZDMtNDRjNy05ZDAyLWE2YWMyZDVlYTVjMyIsIjc0OTVmZGM0LTM0YzQtNGQxNS1hMjg5LTk4Nzg4Y2UzOTlmZCIsImM0MzBiMzk2LWU2OTMtNDZjYy05NmYzLWRiMDFiZjhiYjYyYSIsImIxYmUxYzNlLWI2NWQtNGYxOS04NDI3LWY2ZmEwZDk3ZmViOSIsImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.W8PSIxJqgc4Nzpz7K2tm1JbLHtYvkPe9HfNf-kVG8A0U5wCZFapKuOWDHEJIvBPahc19TedCW26-p0bspFrPlqqk6tgOnzWX9Pz2Lyo9U-_XzetNrO3WEp89RxjwJ5G0HcmcOK9iwJrwDSEpkbomQ25lJ7xsrW4uxtDVGOyHIaApkGIUi2995ZmDwDfn7SfrxFhFaRrGv-_p0ccgGKVOJg098QHtg2tX22AvJpyWxxpDQQ-yzOCm5-oaRiAGLqTG7ZsYE3ZwcRNMT215nkpA12LOD9qo7wUpSUI4H6STuvKfKzF2StZ1TjRyxSDVxH2GlyygsfqJvACECsw4PxXW1w',
  },
};
