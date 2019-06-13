import moment from 'moment'

// const eventList = [
//     {
//         id: '123456789',        
//         name: '西側大門',
//         dateTime: '2018/06/05 18:22:53',
//         type: '其他',
//         snapshot:'',
//         videoUrl:'',
//         tags: [
//             {
//                 tagId: 1,
//                 tagName:'重要'
//             },
//             {
//                 tagId: 2,
//                 tagName:'待通知'
//             },
//             {
//                 tagId: 3,
//                 tagName:'待處理'
//             },
//         ]
//     }
// ]

export class Dummy {

    area = ['华北区', '华东区', '华南区', '华中区']

    title = [
        {
            title: '戴尔中国',
            locationName: '上海、浦东办公室'
        },
        {
            title: 'BASF 上海',
            locationName: '上海工厂'
        },
        {
            title: 'Apple 亚洲',
            locationName: '北京办公室'
        },
        {
            title: '华硕中国',
            locationName: '陆家嘴门市'
        }
    ]

    alarmType = ['开门后', '移动侦测警报', '紧急按钮警报', '仓库警报']

    geteventlistData(args) {
        var data = []
        for (let i = 1; i <= 12; i++) {

            let title_num = Math.round(Math.random() * 3);
            let area_num = Math.round(Math.random() * 3);
            let alarm_num = Math.round(Math.random() * 3);

            console.log('title_num', title_num);
            data.push(
                {
                    id: i.toString(),
                    title: this.title[title_num].title,
                    area: this.area[area_num],
                    locationName: this.title[title_num].locationName,
                    timeStamp: +moment().add('minute', -15 * i),
                    alarmType: this.alarmType[alarm_num],
                    imgUrl: '',
                    videoUrl: ''
                }
            )
        }

        return {
            status: 200,
            message: 'OK',
            event_list: data
        };
    }

}

export default new Dummy();