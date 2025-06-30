import React from 'react';
import { 
  AlertTriangle, 
  Cigarette, 
  Heart, 
  Scale, 
  Users, 
  Activity, 
  Brain, 
  Wine,
  Calendar,
  Shield
} from 'lucide-react';

interface RiskFactorsCardProps {
  riskFactors: Record<string, string>;
}

export const RiskFactorsCard: React.FC<RiskFactorsCardProps> = ({ riskFactors }) => {
  const getFactorIcon = (factorName: string) => {
    const name = factorName.toLowerCase();
    
    if (name.includes('tabaquismo') || name.includes('fumar')) {
      return <Cigarette className="w-5 h-5" />;
    }
    if (name.includes('diabetes')) {
      return <Heart className="w-5 h-5" />;
    }
    if (name.includes('obesidad') || name.includes('peso')) {
      return <Scale className="w-5 h-5" />;
    }
    if (name.includes('familia') || name.includes('historial')) {
      return <Users className="w-5 h-5" />;
    }
    if (name.includes('sedentarismo') || name.includes('ejercicio') || name.includes('actividad')) {
      return <Activity className="w-5 h-5" />;
    }
    if (name.includes('estrés') || name.includes('stress')) {
      return <Brain className="w-5 h-5" />;
    }
    if (name.includes('alcohol')) {
      return <Wine className="w-5 h-5" />;
    }
    if (name.includes('edad')) {
      return <Calendar className="w-5 h-5" />;
    }
    if (name.includes('combinación') || name.includes('síndrome') || name.includes('círculo')) {
      return <AlertTriangle className="w-5 h-5" />;
    }
    
    return <AlertTriangle className="w-5 h-5" />;
  };

  const getFactorSeverity = (description: string) => {
    const desc = description.toLowerCase();
    
    if (desc.includes('crítico') || desc.includes('urgente') || desc.includes('muy grave') || 
        desc.includes('extremo') || desc.includes('crisis')) {
      return {
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-800',
        iconColor: 'text-red-600',
        dotColor: 'bg-red-500',
        severity: 'high'
      };
    }
    if (desc.includes('alto') || desc.includes('preocupante') || desc.includes('grave') || 
        desc.includes('importante') || desc.includes('alarmante')) {
      return {
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        textColor: 'text-orange-800',
        iconColor: 'text-orange-600',
        dotColor: 'bg-orange-500',
        severity: 'medium'
      };
    }
    
    return {
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800',
      iconColor: 'text-yellow-600',
      dotColor: 'bg-yellow-500',
      severity: 'low'
    };
  };

  const sortedFactors = Object.entries(riskFactors).sort(([, descA], [, descB]) => {
    const severityA = getFactorSeverity(descA).severity;
    const severityB = getFactorSeverity(descB).severity;
    
    const severityOrder = { high: 0, medium: 1, low: 2 };
    return severityOrder[severityA as keyof typeof severityOrder] - 
           severityOrder[severityB as keyof typeof severityOrder];
  });

  if (sortedFactors.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-center justify-center text-green-600">
          <Shield className="w-6 h-6 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-green-800">¡Excelente!</h3>
            <p className="text-green-700">No se identificaron factores de riesgo significativos</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Factores de Riesgo Identificados</h3>
            <p className="text-sm text-gray-600">{sortedFactors.length} factor{sortedFactors.length > 1 ? 'es' : ''} requiere{sortedFactors.length === 1 ? '' : 'n'} atención</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {sortedFactors.map(([factor, description]) => {
            const config = getFactorSeverity(description);
            const icon = getFactorIcon(factor);
            
            return (
              <div 
                key={factor} 
                className={`${config.bgColor} ${config.borderColor} border rounded-lg p-4 transition-all duration-200 hover:shadow-md`}
              >
                <div className="flex items-start">
                  <div className={`${config.iconColor} mr-3 mt-0.5`}>
                    {icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-2">
                      <div className={`w-2 h-2 ${config.dotColor} rounded-full mr-2`}></div>
                      <h4 className={`font-semibold ${config.textColor}`}>{factor}</h4>
                    </div>
                    <p className={`text-sm ${config.textColor} leading-relaxed`}>
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
