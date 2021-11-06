/* The function (snippet) below is used to accomplish the following:
Add a line where you use the typeof operator to return the type of values returned.
Confirm the request returns 30 days of data (const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');).
Update the above line to modify the date range (update the default of 30 to the requested range).
Utilize the for...in statement to return transactions where the amount equals 6.33. */


// Retrieve Transactions for an Item
// https://customerapiurl/docs/#transactions
app.get('/api/transactions', async function (request, response, next) {
  // Pull transactions for the Item for the last 30 days
  const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
  const endDate = moment().format('YYYY-MM-DD');
  const configs = {
    access_token: ACCESS_TOKEN,
    start_date: startDate,
    end_date: endDate,
    options: {
      count: 250,
      offset: 0,
    },
  };
  
  
  try {
    const transactionsResponse = await client.transactionsGet(configs);
    prettyPrintResponse(transactionsResponse);
    response.json(transactionsResponse.data);
  } catch (error) {
    prettyPrintResponse(error.response);
    return response.json(formatError(error.response));
  }
});
