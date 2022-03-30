
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

function onChange(dates, dateStrings) {
  console.log('From: ', dates[0], ', to: ', dates[1]);
  console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
}

const Profile = () => {
    return (
        <div>
        <RangePicker
        
      mode="month"
          ranges={{
            Today: [moment(), moment()],
            'This Month': [moment().startOf('year'), moment().endOf('year')],
          }}
          onChange={onChange}
        />
        <br />
        <RangePicker
          ranges={{
            Today: [moment(), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
          }}
          showTime
          format="YYYY/MM/DD HH:mm:ss"
          onChange={onChange}
        />
      </div>
    )
}
export default Profile;