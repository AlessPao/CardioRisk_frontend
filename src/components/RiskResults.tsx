import React from 'react';
import { AlertTriangle, Shield, AlertCircle, Heart, TrendingUp, Clock } from 'lucide-react';
import { PredictionResponse, RiskLevel } from '../types/api';

interface RiskResultsProps {
  results: PredictionResponse;
  onNewPrediction: () => void;
}

export const RiskResults: React.FC<RiskResultsProps> = ({ results, onNewPrediction }) => {
  const getRiskConfig = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Alto Riesgo':
        return {
          color: 'red',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          icon: <AlertTriangle className="w-6 h-6" />,
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600'
        };
      case 'Riesgo Moderado':
        return {
          color: 'orange',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          textColor: 'text-orange-800',
          icon: <AlertCircle className="w-6 h-6" />,
          iconBg: 'bg-orange-100',
          iconColor: 'text-orange-600'
        };
      default:
        return {
          color: 'green',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          icon: <Shield className="w-6 h-6" />,
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600'
        };
    }
  };

  const config = getRiskConfig(results.risk_prediction);
  const percentage = Math.round(results.risk_probability * 100);

  return (
    <div className="space-y-6">
      {/* Risk Level Header */}
      <div className={`${config.bgColor} ${config.borderColor} border-2 rounded-xl p-6`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className={`${config.iconBg} p-3 rounded-xl mr-4`}>
              <div className={config.iconColor}>
                {config.icon}
              </div>
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${config.textColor}`}>
                {results.risk_prediction}
              </h2>
              <p className="text-gray-600">Resultado de la evaluación</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${config.textColor}`}>
              {percentage}%
            </div>
            <p className="text-sm text-gray-600">Probabilidad</p>
          </div>
        </div>

        {/* Confidence Interval */}
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span>
            Intervalo de confianza: {Math.round(results.confidence_interval[0] * 100)}% - {Math.round(results.confidence_interval[1] * 100)}%
          </span>
        </div>
      </div>

      {/* Risk Factors */}
      {Object.keys(results.risk_factors).length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 text-red-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Factores de Riesgo Identificados</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(results.risk_factors).map(([factor, description]) => (
              <div key={factor} className="flex items-start p-3 bg-red-50 rounded-lg border border-red-100">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <div className="font-medium text-red-800">{factor}</div>
                  <div className="text-sm text-red-700">{description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center mb-4">
          <Heart className="w-5 h-5 text-blue-600 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900">Recomendaciones Personalizadas</h3>
        </div>
        <div className="space-y-3">
          {results.recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div className="text-blue-800">{recommendation}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <div className="font-medium text-yellow-800 mb-1">Aviso Importante</div>
            <div className="text-sm text-yellow-700">{results.disclaimer}</div>
          </div>
        </div>
      </div>

      {/* New Prediction Button */}
      <button
        onClick={onNewPrediction}
        className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold
                 hover:bg-gray-200 transition-all duration-200 transform hover:scale-[1.02] 
                 active:scale-[0.98] border border-gray-200"
      >
        Realizar Nueva Evaluación
      </button>
    </div>
  );
};