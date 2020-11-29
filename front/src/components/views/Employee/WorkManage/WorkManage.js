import React, { useState,useEffect } from "react";
import 'antd/dist/antd.css'; //antd디자인 CSS
import { Layout, Table, Tabs } from 'antd';
import LoginedUser from '../../../../utils/LoginedUser';////utils
import LogoutUser from '../../../../utils/LogoutUser';
import SideBar from '../../../../utils/SideBarEmployee';///여기까지
import { workManageColumn } from './WorkManageColumns'; //업무 칼럼
import WorkManageSend from './WorkManageSend'; //업무지시 페이지
import WorkManageInfo from './WorkManageInfo';
import axios from "axios";

//칼럼
const { Header, Content } = Layout; //Layout부분을  Header , Content ,Sider, Footer로 나눠서 사용한다.
const { TabPane } = Tabs;

  function WorkManage(props) {
    //업무 상세보기
    const [Visible, setVisible] = useState(false);
    const [UserData, setUserData] = useState(['']);

    const handleInformation = (value) => {
      //console.log(value);
      setUserData(value);
      setVisible(true);
    }

    const handleOk = () => {
      setVisible(false);
    }

    const handleCancel = () => {
      setVisible(false);
    }
    //업무 조회 데이터 가져오기
    const [Data, setData] = useState(['']);

    useEffect(() => {
      axios.get('/api/workmanageread').then(response => {
        console.log(response.data);
        setData(response.data);
      }); 
    }, []);
      return (
        <div>
          <Layout style={{ minHeight: '100vh' }}>
            <SideBar DefaultKey={'3'}/>
            <Layout>
              <Header style={{ background: '#fff', padding: 0, textAlign: 'end' }} >
                <LoginedUser />
                <LogoutUser pageChange={props}/>
              </Header>
              <Content style={{ margin: '0 auto', width: '100%'}}>
                <Tabs defaultActiveKey="1" type={'card'} tabBarStyle={{backgroundColor:'white'}}>
                  <TabPane tab="업무조회" key="1">  
                    <Table columns={workManageColumn} dataSource={Data} pagination={false} 
                    onRow={(record) => ({onClick: () => { handleInformation(record); }})} />
                  </TabPane>
                  <TabPane tab="업무지시" key="2">
                    <WorkManageSend />
                  </TabPane>
                </Tabs>
                <WorkManageInfo 
                  Visible={Visible} 
                  UserData={UserData} 
                  handleOk={handleOk} 
                  handleCancel={handleCancel} 
                />
              </Content>
            </Layout>
          </Layout>
        </div>
);
}

export default WorkManage