import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { PredictionResponse } from '../types/api';
import { ExecutiveSummary } from './ExecutiveSummary';
import { RiskMeter } from './RiskMeter';
import { RiskFactorsCard } from './RiskFactorsCard';
import { RecommendationsCard } from './RecommendationsCard';
import { ConfidenceInterval } from './ConfidenceInterval';

interface RiskResultsProps {
  results: PredictionResponse;
  onNewPrediction: () => void;
}

export const RiskResults: React.FC<RiskResultsProps> = ({ results, onNewPrediction }) => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Evaluación de Riesgo Cardiovascular
        </h1>
        <p className="text-gray-600">
          Análisis completo basado en sus datos de salud
        </p>
      </div>

      {/* Executive Summary */}
      <ExecutiveSummary results={results} />

      {/* Risk Meter - Main Visual */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <RiskMeter 
          probability={results.risk_probability}
          riskLevel={results.risk_prediction}
        />
      </div>

      {/* Confidence Interval */}
      <ConfidenceInterval 
        interval={results.confidence_interval}
        currentProbability={results.risk_probability}
        riskLevel={results.risk_prediction}
      />

      {/* Risk Factors */}
      <RiskFactorsCard riskFactors={results.risk_factors} />

      {/* Recommendations */}
      <RecommendationsCard 
        recommendations={results.recommendations}
        riskLevel={results.risk_prediction}
      />

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-start">
          <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5 mr-4 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-yellow-800 mb-2">Aviso Médico Importante</h3>
            <p className="text-sm text-yellow-700 leading-relaxed mb-3">
              {results.disclaimer}
            </p>
            <div className="text-xs text-yellow-600 bg-yellow-100 rounded-lg p-3">
              <strong>Recuerde:</strong> Esta evaluación es una herramienta de apoyo y no reemplaza 
              el juicio clínico profesional. Siempre consulte con un médico para decisiones sobre su salud.
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={onNewPrediction}
          className="bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold
                   hover:bg-blue-700 transition-all duration-200 transform hover:scale-[1.02] 
                   active:scale-[0.98] shadow-lg hover:shadow-xl"
        >
          Nueva Evaluación
        </button>
        
        <button
          onClick={() => window.print()}
          className="bg-gray-600 text-white py-3 px-6 rounded-xl font-semibold
                   hover:bg-gray-700 transition-all duration-200 transform hover:scale-[1.02] 
                   active:scale-[0.98] shadow-lg hover:shadow-xl"
        >
          Imprimir Resultados
        </button>
      </div>

      {/* Additional Resources */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recursos Adicionales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-2">Emergencias Cardíacas</h4>
            <p className="text-sm text-gray-600">
              Dolor de pecho, dificultad respiratoria, mareos intensos
            </p>
            <p className="text-sm font-semibold text-red-600 mt-2">
              📞 Llame inmediatamente al 911 o acuda a emergencias
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-2">Información Confiable</h4>
            <p className="text-sm text-gray-600">
              American Heart Association, Mayo Clinic, y su médico de cabecera
            </p>
            <p className="text-sm font-semibold text-blue-600 mt-2">
              🌐 Consulte fuentes médicas verificadas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};