import React from 'react';

interface FormSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 transition-all duration-200 hover:shadow-md">
      <div className="flex items-center mb-4">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mr-3">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};