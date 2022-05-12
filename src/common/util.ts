import moment from 'moment';

export default class Util {
  private static _TimezoneOffset = new Date().getTimezoneOffset();

  static formatDateString(
    dateStr: moment.MomentInput,
    isISO = true,
    format = 'YYYY-MM-DD',
  ) {
    if (!dateStr) {
      return null;
    }
    if (isISO) {
      return moment(dateStr).toISOString();
    } else {
      return moment(dateStr).format(format);
    }
  }

  static transferDateString(
    date: number | moment.Moment,
    bias: number,
    toUTC = true,
  ) {
    if (!date) {
      date = toUTC ? moment() : moment.utc();
    }
    let targetDate;
    let biasHours = bias ? bias * 60 : this._TimezoneOffset;
    if (toUTC) {
      // change to utc time
      targetDate = moment(date.valueOf() + biasHours * 60 * 1000);
    } else {
      // change to local time
      targetDate = moment(date.valueOf() - biasHours * 60 * 1000);
    }
    return targetDate.toISOString();
  }

  static getDatetimeFilterStr(
    date: moment.Moment,
    mNum: any,
    dNum: any,
    yNum = 0,
  ) {
    if (!date) {
      date = moment();
    }
    let targetDate = date
      .subtract(mNum, 'months')
      .subtract(dNum, 'days')
      .subtract(yNum, 'years');
    return targetDate.format('YYYY-MM-DD');
  }

  static cutString(str: string, len?: number) {
    len = len || 16;
    if (!str || typeof str != 'string') {
      return '';
    }
    if (this.getStrLength(str) > 16) {
      let char_length = 0;
      for (let i = 0; i < str.length; i++) {
        let son_str = str.charCodeAt(i);
        son_str > 0 && son_str <= 128 ? (char_length += 1) : (char_length += 2);
        if (char_length >= len) {
          return str.substr(0, i + 1) + '...';
        }
      }
    }
    return str;
  }
  // 字符串长度:中文2个字符，英文一个
  static getStrLength(str: string) {
    var cArr = str.match(/[^\x00-\xff]/gi);
    return str.length + (cArr == null ? 0 : cArr.length);
  }

  static getInitChar(str: string) {
    let arr = str.split(' ');
    return arr
      .filter((e) => e[0] !== '(' && e[0] !== ')')
      .map((e) => e[0])
      .join('')
      .toUpperCase();
  }

  static checkWebBrowser(): boolean {
    // console.log(navigator.userAgent)
    if (
      navigator.userAgent.indexOf('iPhone') < 0 &&
      navigator.userAgent.indexOf('Android') < 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  static checkTeamsBrowser(): boolean {
    try {
      return (
        window.parent !== window.self ||
        navigator.userAgent.indexOf('Teams') != -1
      );
    } catch (e) {
      return true;
    }

    // let str = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1)
    // return str.toLowerCase() === 'teams.aspx'
  }

  static formatNumber(num: number): string {
    if (!num || num < 0) {
      num = 0;
    } else if (num >= Number.MAX_VALUE) {
      num = Number.MAX_VALUE;
    }

    if (num > 99) {
      return '99+';
    }
    return num.toString();
  }

  static getQueryVariable(variable: any, url: string) {
    var query = url.split('?')[1];
    if (query) {
      var vars = query.split('&');
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (pair[0] == variable) {
          return pair[1];
        }
      }
    }
    return null;
  }

  static objectToFile = (obj: any) => {
    if (obj instanceof File) {
      return obj;
    }
    // let lst=list||[]
    for (let property in obj) {
      if (obj.hasOwnProperty(property)) {
        // if the property is an object, but not a File, use recursivity.
        if (
          typeof obj[property] === 'object' &&
          !(obj[property] instanceof File)
        ) {
          this.objectToFile(obj[property]);
        } else if (obj[property] instanceof File) {
          // if it's a string or a File object
          obj[property].status = 'done';
          return obj[property];
        }
      }
    }
    return null;
  };
}
