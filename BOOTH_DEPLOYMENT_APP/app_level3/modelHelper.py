import os
import pandas as pd
import pickle
import numpy as np


MODEL_PATH = "black_money_model_pipeline.h5"


class ModelHelper():
    def __init__(self):
        pass

    
    def makePredictions(self, country, amount_usd, transaction_type, month, industry, destination_country, reported_by_authority, 
                         money_laundering_risk_score, shell_companies_involved, tax_haven_country):

        df = pd.DataFrame()
        df["country"] = [country]
        df["amount_usd"] = [amount_usd]
        df["transaction_type"] = [transaction_type]
        df["month"] = [month]
        df["industry"] = [industry]
        df["destination_country"] = [destination_country]
        df["reported_by_authority"] = [reported_by_authority]
        df["money_laundering_risk_score"] = [money_laundering_risk_score]
        df["shell_companies_involved"] = [shell_companies_involved]
        df["tax_haven_country"] = [tax_haven_country]
    
        # model
        try:
            model = pickle.load(open(MODEL_PATH, 'rb'))
        except FileNotFoundError:
            msg = f"FileNotFound {MODEL_PATH} working directory: {os.getcwd()}"
            raise FileNotFoundError(msg)

        
        # columns in order
        df = df.loc[:, ['country', 'amount_usd', 'transaction_type', 'month', 'industry', 'destination_country', 'reported_by_authority',
                    'money_laundering_risk_score', 'shell_companies_involved', 'tax_haven_country']]
        
        preds = model.predict_proba(df)
        return(preds[0][1])
