const threeData = {
  url: /\/irrigation-monitoring-platform\/irrigation-info\/water-data\/page(\?.*)?/, // 正则匹配
  type: 'get',
  response: (req) => {
    console.log('req:', req);
    const urlParams = new URLSearchParams(req.url.split('?')[1]);
    const queryParams = Object.fromEntries(urlParams.entries());
    console.log("🚀 ~ queryParams:", queryParams);

    return filterData(queryParams)
  }
}


//下面模拟数据库里的数据
const mysqlData = [
  {
    "id": "537689356173836288",
    "tenantId": "0",
    "applicationId": "447194926241808384",
    "createAt": "2024-04-23 10:30:02",
    "updateAt": "2024-04-23 10:30:02",
    "projectId": "477276814008385536",
    "deviceId": "2023050908",
    "deviceName": "会泽县大桥乡王家山大沟",
    "dataTime": "2024-04-23 10:29:00",
    "flow": 0.070,
    "elevationLevel": 0.000,
    "surfaceLevel": 0.090
  },
  {
    "id": "537689355519524864",
    "tenantId": "0",
    "applicationId": "447194926241808384",
    "createAt": "2024-04-23 10:30:02",
    "updateAt": "2024-04-23 10:30:02",
    "projectId": "477276814008385536",
    "deviceId": "2023050906",
    "deviceName": "会泽县迤车镇东干渠",
    "dataTime": "2024-04-23 10:28:51",
    "flow": 0.440,
    "elevationLevel": 100.360,
    "surfaceLevel": 0.260
  },
  {
    "id": "537689354894573568",
    "tenantId": "0",
    "applicationId": "447194926241808384",
    "createAt": "2024-04-23 10:30:02",
    "updateAt": "2024-04-23 10:30:02",
    "projectId": "477276814008385536",
    "deviceId": "2023050905",
    "deviceName": "会泽县迤车镇西干渠2",
    "dataTime": "2024-04-23 10:28:46",
    "flow": 1.010,
    "elevationLevel": 0.000,
    "surfaceLevel": 0.310
  },
  {
    "id": "537689357545373696",
    "tenantId": "0",
    "applicationId": "447194926241808384",
    "createAt": "2024-04-23 10:30:02",
    "updateAt": "2024-04-23 10:30:02",
    "projectId": "477276814008385536",
    "deviceId": "2023050912",
    "deviceName": "会泽县娜菇镇龙王庙村1号点",
    "dataTime": "2024-04-23 10:28:43",
    "flow": 1.010,
    "elevationLevel": 0.000,
    "surfaceLevel": 1.010
  },
  {
    "id": "537689353502064640",
    "tenantId": "0",
    "applicationId": "447194926241808384",
    "createAt": "2024-04-23 10:30:02",
    "updateAt": "2024-04-23 10:30:02",
    "projectId": "477276814008385536",
    "deviceId": "2023050903",
    "deviceName": "迤车电厂-进水口",
    "dataTime": "2024-04-23 10:28:42",
    "flow": 0.540,
    "elevationLevel": 0.000,
    "surfaceLevel": 0.540
  },
  {
    "id": "537689354110238720",
    "tenantId": "0",
    "applicationId": "447194926241808384",
    "createAt": "2024-04-23 10:30:02",
    "updateAt": "2024-04-23 10:30:02",
    "projectId": "477276814008385536",
    "deviceId": "2023050904",
    "deviceName": "会泽县大桥乡者米村",
    "dataTime": "2024-04-23 10:28:14",
    "flow": 0.040,
    "elevationLevel": 0.000,
    "surfaceLevel": 0.030
  },
  {
    "id": "537689356853313536",
    "tenantId": "0",
    "applicationId": "447194926241808384",
    "createAt": "2024-04-23 10:30:02",
    "updateAt": "2024-04-23 10:30:02",
    "projectId": "477276814008385536",
    "deviceId": "2023050916",
    "deviceName": "迤车电厂-进水口",
    "dataTime": "2024-04-23 10:28:10",
    "flow": 0.000,
    "elevationLevel": 0.000,
    "surfaceLevel": 0.200
  },
  {
    "id": "537681802806951936",
    "tenantId": "0",
    "applicationId": "447194926241808384",
    "createAt": "2024-04-23 10:00:01",
    "updateAt": "2024-04-23 10:00:01",
    "projectId": "477276814008385536",
    "deviceId": "2023050904",
    "deviceName": "会泽县大桥乡者米村",
    "dataTime": "2024-04-23 09:59:46",
    "flow": 0.040,
    "elevationLevel": 0.000,
    "surfaceLevel": 0.030
  },
  {
    "id": "537681804690194432",
    "tenantId": "0",
    "applicationId": "447194926241808384",
    "createAt": "2024-04-23 10:00:01",
    "updateAt": "2024-04-23 10:00:01",
    "projectId": "477276814008385536",
    "deviceId": "2023050908",
    "deviceName": "会泽县大桥乡王家山大沟",
    "dataTime": "2024-04-23 09:59:30",
    "flow": 0.070,
    "elevationLevel": 0.000,
    "surfaceLevel": 0.090
  },
  {
    "id": "537681805323534336",
    "tenantId": "0",
    "applicationId": "447194926241808384",
    "createAt": "2024-04-23 10:00:01",
    "updateAt": "2024-04-23 10:00:01",
    "projectId": "477276814008385536",
    "deviceId": "2023050916",
    "deviceName": "迤车电厂-进水口",
    "dataTime": "2024-04-23 09:59:30",
    "flow": 0.000,
    "elevationLevel": 0.000,
    "surfaceLevel": 0.210
  }
]
//下面模拟传参查询
const filterData = (conditions) => {
  let filteredData = mysqlData;

  if (conditions.deviceId !== '') {
    filteredData = filteredData.filter(item => item.deviceId.includes(conditions.deviceId));
  }
  // 其他条件过滤逻辑根据需要添加

  return {
    success: true,
    message: '操作成功！',
    data: {
      records: filteredData,
      total: filteredData.length,
      size: conditions.pageSize,
      current: conditions.pageNum,
      orders: [],
      optimizeCountSql: true,
      hitCount: false,
      countId: null,
      maxLimit: null,
      searchCount: true,
      pages: Math.ceil(filteredData.length / conditions.pageSize)
    },
    code: 200
  };
};


module.exports = [threeData]
