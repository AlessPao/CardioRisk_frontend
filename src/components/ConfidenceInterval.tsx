import React from 'react';
import { TrendingUp, Info } from 'lucide-react';

interface ConfidenceIntervalProps {
  interval: [number, number];
  currentProbability: number;
  riskLevel: string;
}

export const ConfidenceInterval: React.FC<ConfidenceIntervalProps> = ({ 
  interval, 
  currentProbability, 
  riskLevel 
}) => {
  const [minProb, maxProb] = interval;
  const minPercent = Math.round(minProb * 100);
  const maxPercent = Math.round(maxProb * 100);
  const currentPercent = Math.round(currentProbability * 100);
  
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Alto Riesgo':
        return 'bg-red-500';
      case 'Riesgo Moderado':
        return 'bg-orange-500';
      default:
        return 'bg-green-500';
    }
  };

  const riskColor = getRiskColor(riskLevel);
  
  // Calculate positions for the visual bar (0-100% scale)
  const minPosition = minPercent;
  const maxPosition = maxPercent;
  const currentPosition = currentPercent;
  const rangeWidth = maxPosition - minPosition;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center mb-4">
        <TrendingUp className="w-5 h-5 text-blue-600 mr-3" />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Intervalo de Confianza</h3>
          <p className="text-sm text-gray-600">Rango estadístico de la predicción</p>
        </div>
      </div>
      
      {/* Visual representation */}
      <div className="mb-6">
        <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
          {/* Confidence interval range */}
          <div 
            className="absolute top-0 h-full bg-blue-200 rounded"
            style={{
              left: `${minPosition}%`,
              width: `${rangeWidth}%`
            }}
          />
          
          {/* Current probability marker */}
          <div 
            className={`absolute top-0 w-1 h-full ${riskColor} rounded-full`}
            style={{ left: `${currentPosition}%` }}
          />
          
          {/* Scale markers */}
          <div className="absolute inset-0 flex items-center">
            {[0, 25, 50, 75, 100].map((mark) => (
              <div 
                key={mark}
                className="absolute w-px h-full bg-gray-300"
                style={{ left: `${mark}%` }}
              />
            ))}
          </div>
        </div>
        
        {/* Scale labels */}
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>
      
      {/* Numerical values */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{minPercent}%</div>
          <div className="text-sm text-gray-600">Mínimo</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${
            riskLevel === 'Alto Riesgo' ? 'text-red-600' :
            riskLevel === 'Riesgo Moderado' ? 'text-orange-600' : 'text-green-600'
          }`}>
            {currentPercent}%
          </div>
          <div className="text-sm text-gray-600">Predicción</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{maxPercent}%</div>
          <div className="text-sm text-gray-600">Máximo</div>
        </div>
      </div>
      
      {/* Explanation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-800 mb-1">¿Qué significa esto?</h4>
            <p className="text-sm text-blue-700 leading-relaxed">
              El modelo está <strong>{((1 - (maxProb - minProb)) * 100).toFixed(0)}% seguro</strong> de que su riesgo cardiovascular 
              está entre <strong>{minPercent}%</strong> y <strong>{maxPercent}%</strong>. 
              La predicción específica de <strong>{currentPercent}%</strong> es el valor más probable dentro de este rango.
            </p>
            {rangeWidth > 30 && (
              <p className="text-sm text-blue-600 mt-2">
                <strong>Nota:</strong> El rango es amplio, sugiriendo que sería beneficial obtener más información clínica para una evaluación más precisa.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
