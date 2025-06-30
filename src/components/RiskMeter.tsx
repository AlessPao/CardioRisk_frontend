import React from 'react';

interface RiskMeterProps {
  probability: number;
  riskLevel: string;
}

export const RiskMeter: React.FC<RiskMeterProps> = ({ probability, riskLevel }) => {
  const percentage = probability * 100;
  
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Alto Riesgo':
        return {
          primary: '#dc2626',
          secondary: '#fecaca',
          gradient: 'from-red-500 to-red-600'
        };
      case 'Riesgo Moderado':
        return {
          primary: '#d97706',
          secondary: '#fed7aa',
          gradient: 'from-orange-500 to-orange-600'
        };
      default:
        return {
          primary: '#16a34a',
          secondary: '#bbf7d0',
          gradient: 'from-green-500 to-green-600'
        };
    }
  };

  const colors = getRiskColor(riskLevel);
  const radius = 90;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="relative">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            stroke="#e5e7eb"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress circle */}
          <circle
            stroke={colors.primary}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold" style={{ color: colors.primary }}>
            {percentage.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600 text-center">
            Probabilidad de<br />Riesgo
          </div>
        </div>
      </div>
      
      {/* Risk level indicator */}
      <div className="mt-4 text-center">
        <div 
          className="px-4 py-2 rounded-full text-white font-semibold text-sm"
          style={{ backgroundColor: colors.primary }}
        >
          {riskLevel}
        </div>
      </div>
    </div>
  );
};
