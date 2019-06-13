import moment from 'moment';

export class MomentHelper{

    fromNow(num){
       moment.locale('zh-cn');
       return moment(moment(num).format("YYYYMMDD HHmmss"), "YYYYMMDD HHmmss").fromNow();
    }

    format(num,format){
       return moment(num).format(format);
    }

    getDate(num){
        return moment(moment(num).format("YYYYMMDD"), "YYYYMMDD");
    }

}

export default new MomentHelper();