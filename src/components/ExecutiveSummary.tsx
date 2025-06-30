import React from 'react';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle } from 'lucide-react';
import { PredictionResponse } from '../types/api';

interface ExecutiveSummaryProps {
  results: PredictionResponse;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ results }) => {
  const percentage = Math.round(results.risk_probability * 100);
  const riskFactorsCount = Object.keys(results.risk_factors).length;
  const urgentRecommendations = results.recommendations.filter(rec => 
    rec.includes('🚨') || rec.includes('CRÍTICO') || rec.includes('URGENTE')
  ).length;

  const getRiskTrend = () => {
    if (results.risk_prediction === 'Alto Riesgo') {
      return {
        icon: <TrendingUp className="w-5 h-5 text-red-600" />,
        text: 'Tendencia de riesgo elevada',
        color: 'text-red-600',
        bgColor: 'bg-red-50'
      };
    } else if (results.risk_prediction === 'Riesgo Moderado') {
      return {
        icon: <Minus className="w-5 h-5 text-orange-600" />,
        text: 'Tendencia de riesgo estable',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50'
      };
    } else {
      return {
        icon: <TrendingDown className="w-5 h-5 text-green-600" />,
        text: 'Tendencia de riesgo baja',
        color: 'text-green-600',
        bgColor: 'bg-green-50'
      };
    }
  };

  const trend = getRiskTrend();

  const getActionPriority = () => {
    if (urgentRecommendations > 0) {
      return {
        icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
        text: 'Acción inmediata requerida',
        count: urgentRecommendations,
        color: 'text-red-600',
        bgColor: 'bg-red-50'
      };
    } else if (results.risk_prediction !== 'Bajo Riesgo') {
      return {
        icon: <AlertTriangle className="w-5 h-5 text-orange-600" />,
        text: 'Monitoreo y mejoras recomendadas',
        count: results.recommendations.length,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50'
      };
    } else {
      return {
        icon: <CheckCircle className="w-5 h-5 text-green-600" />,
        text: 'Mantenimiento del estilo saludable',
        count: results.recommendations.length,
        color: 'text-green-600',
        bgColor: 'bg-green-50'
      };
    }
  };

  const actionPriority = getActionPriority();

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen Ejecutivo</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Risk Level */}
        <div className={`${trend.bgColor} rounded-lg p-4 border-l-4 ${
          results.risk_prediction === 'Alto Riesgo' ? 'border-red-500' :
          results.risk_prediction === 'Riesgo Moderado' ? 'border-orange-500' : 'border-green-500'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Nivel de Riesgo</p>
              <p className={`text-lg font-bold ${trend.color}`}>{percentage}%</p>
              <p className="text-xs text-gray-500">{results.risk_prediction}</p>
            </div>
            {trend.icon}
          </div>
        </div>

        {/* Risk Factors */}
        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Factores de Riesgo</p>
              <p className="text-lg font-bold text-gray-900">{riskFactorsCount}</p>
              <p className="text-xs text-gray-500">
                {riskFactorsCount === 0 ? 'Ninguno identificado' : 
                 riskFactorsCount === 1 ? 'Factor identificado' : 'Factores identificados'}
              </p>
            </div>
            <AlertTriangle className="w-5 h-5 text-gray-600" />
          </div>
        </div>

        {/* Action Priority */}
        <div className={`${actionPriority.bgColor} rounded-lg p-4 border-l-4 ${
          urgentRecommendations > 0 ? 'border-red-500' :
          results.risk_prediction !== 'Bajo Riesgo' ? 'border-orange-500' : 'border-green-500'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Prioridad de Acción</p>
              <p className={`text-lg font-bold ${actionPriority.color}`}>{actionPriority.count}</p>
              <p className="text-xs text-gray-500">Recomendaciones</p>
            </div>
            {actionPriority.icon}
          </div>
        </div>

        {/* Confidence */}
        <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Confianza del Modelo</p>
              <p className="text-lg font-bold text-blue-600">
                {Math.round((1 - (results.confidence_interval[1] - results.confidence_interval[0])) * 100)}%
              </p>
              <p className="text-xs text-gray-500">Precisión estimada</p>
            </div>
            <CheckCircle className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Insights Clave</h3>
        <div className="space-y-2">
          {results.risk_prediction === 'Alto Riesgo' && (
            <div className="flex items-center text-sm text-red-700">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
              <span>Su perfil indica riesgo cardiovascular elevado que requiere atención médica inmediata</span>
            </div>
          )}
          
          {riskFactorsCount > 0 && (
            <div className="flex items-center text-sm text-orange-700">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
              <span>
                {riskFactorsCount} factor{riskFactorsCount > 1 ? 'es' : ''} de riesgo 
                {riskFactorsCount > 1 ? ' son' : ' es'} modificable{riskFactorsCount > 1 ? 's' : ''} con cambios en el estilo de vida
              </span>
            </div>
          )}
          
          {results.risk_prediction === 'Bajo Riesgo' && (
            <div className="flex items-center text-sm text-green-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>Su estilo de vida actual está protegiendo efectivamente su salud cardiovascular</span>
            </div>
          )}
          
          <div className="flex items-center text-sm text-blue-700">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            <span>
              El modelo analizó sus datos con {Math.round((1 - (results.confidence_interval[1] - results.confidence_interval[0])) * 100)}% de confianza
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
