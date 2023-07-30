import requests
import pandas as pd
from flask import Flask, jsonify
import matplotlib.pyplot as plt
import io
import base64
import os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
cors = CORS(app)
@app.route('/return_investment_pie')


def return_investment_pie():
    id = os.getenv("API_KEY")
    url = "https://live.trading212.com/api/v0/equity/portfolio"

    headers = {"Authorization": id}

    response = requests.get(url, headers=headers)

    data = response.json()
    df_data = pd.DataFrame(data)
    pd.set_option('display.max_columns',None)


    df_data['initValue'] = df_data['quantity']*df_data['averagePrice']
    df_data['totRtn'] = df_data['ppl'] - df_data['fxPpl'].fillna(0)
    df_data['currValue'] = df_data['quantity']*df_data['currentPrice']
    df_data['trueInitValue'] = df_data['initValue'].apply(lambda x: x if x < 1000 else x/100)
    df_data['trueCurrValue'] = df_data['currValue'].apply(lambda x: x if x < 1000 else x/100)
    df_data['perPie'] = (df_data['trueCurrValue']/df_data['trueCurrValue'].sum())*100
    df_data['perTotRtn'] = ((df_data['trueCurrValue']/df_data['trueInitValue'])-1)*100
    # print(df_data[['ticker','trueInitValue','totRtn','trueCurrValue','perPie','perTotRtn']].sort_values(['totRtn'],ascending=False).reset_index(drop=True))
    # print(df_data['totRtn'].sum())
    # print("%.2f"%round(((df_data['currValue'].sum()/df_data['initValue'].sum())-1)*100,2))
    plt.ioff()
    plt.bar(df_data['ticker'], df_data['perTotRtn'])#.apply(lambda x: round(x,2)))
    plt.xticks(rotation = 270)
    buffer = io.BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    chart_base64 = base64.b64encode(buffer.read()).decode('utf-8')
    data = df_data['perPie']
    labels = df_data['ticker']
    plt.close()
    return jsonify({"chart": chart_base64})

if __name__ == '__main__':
    app.run(debug = True)