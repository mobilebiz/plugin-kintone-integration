const { KintoneRestAPIClient } = require('@kintone/rest-api-client');

exports.handler = async function (context, event, callback) {
  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
  try {
    // パラメータを取得
    let from = event.from || '';
    if (!from) throw new Error('parameter error.');
    from = from.replace(/^\+81/, '0'); // E.164 -> 0AB〜J

    // 環境変数を取得
    const {
      KINTONE_SUB_DOMAIN,
      KINTONE_CUSTOMER_API_TOKEN,
      KINTONE_CUSTOMER_APP_ID,
      KINTONE_NUMBER_FIELD_CODE,
      KINTONE_NAME_FIELD_CODE,
    } = context;

    const client = new KintoneRestAPIClient({
      baseUrl: `https://${KINTONE_SUB_DOMAIN}.cybozu.com`,
      auth: {
        apiToken: KINTONE_CUSTOMER_API_TOKEN, // 顧客管理アプリのAPI_TOKEN
      },
    });
    const params = {
      app: KINTONE_CUSTOMER_APP_ID, // 顧客管理アプリのアプリID
    };

    // 全件検索（TELフィールドにハイフン入りで登録されている可能性があるので全件しらべる
    const res = await client.record.getAllRecords(params);
    const customer = res.filter((record) => {
      const tel = record[KINTONE_NUMBER_FIELD_CODE].value.replace(/-/g, ''); // ハイフンを削除
      return tel === from;
    });
    const result = {};
    result.id = customer.length > 0 ? customer[0]['レコード番号'].value : '';
    console.log(result.id);
    result.customerName =
      customer.length > 0 ? customer[0][KINTONE_NAME_FIELD_CODE].value : from;
    console.log(result.customerName);
    response.appendHeader('Content-Type', 'application/json');
    response.setBody(result);
    callback(null, response);
  } catch (err) {
    console.error(`👺 ERROR get-customer: ${err.message ? err.message : err}`);
    callback(err);
  }
};
