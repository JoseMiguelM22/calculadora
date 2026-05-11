import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PhoneCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [isTriggered, setIsTriggered] = useState(false);

  const handleInput = (val) => {
    if (isTriggered) {
      setDisplay(String(val));
      setIsTriggered(false);
    } else {
      setDisplay(prev => (prev === '0' ? String(val) : prev + val));
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setIsTriggered(false);
  };

  const calculate = () => {
    try {
      // 1. GATILLO DE SUMA (+) -> Fecha de Nacimiento
      // Detecta si hay 3 términos sumados y cada uno tiene 3 o más dígitos
      const sumTerms = display.split('+').filter(t => t.trim() !== '');
      if (sumTerms.length === 3 && sumTerms.every(t => t.length >= 3)) {
        setDisplay('08 07 2006');
        setIsTriggered(true);
        return;
      }

      // Detecta si hay 3 factores multiplicados y cada uno tiene 3 o más dígitos
      const multFactors = display.split('×').filter(f => f.trim() !== '');
      if (multFactors.length === 3 && multFactors.every(f => f.length >= 3)) {
        const now = new Date();
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        
        // Formato DDMM.HHMMSS en una sola línea
        setDisplay(`${day}${month}.${hours}${minutes}${seconds}`);
        setIsTriggered(true);
        return;
      }

      // 3. CÁLCULO NORMAL (Si no se cumplen los requisitos de los trucos)
      const evalString = display.replace(/×/g, '*').replace(/÷/g, '/').replace(/,/g, '.');
      const result = eval(evalString);
      const formattedResult = Number.isInteger(result) ? result : result.toFixed(2);
      
      setDisplay(String(formattedResult).replace('.', ','));
      setIsTriggered(false);

    } catch {
      setDisplay('Error');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-sans select-none">
      <div className="w-full max-w-[360px] flex flex-col bg-black">
        
        {/* Pantalla de resultados con auto-ajuste de tamaño */}
        <div className="flex flex-col justify-end px-6 pb-6 h-80 text-right overflow-hidden">
          <motion.div 
            key={display}
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 1 }}
            className={`text-white font-light tracking-tight transition-all duration-200 whitespace-nowrap overflow-hidden leading-none ${
              display.length > 10 ? 'text-4xl' : display.length > 8 ? 'text-5xl' : 'text-7xl'
            }`}
          >
            {display}
          </motion.div>
        </div>

        {/* Teclado Estilo Teléfono */}
        <div className="grid grid-cols-4 gap-3 px-2 pb-10">
          <button onClick={clearAll} className="btn-ios bg-[#a5a5a5] text-black">AC</button>
          <button className="btn-ios bg-[#a5a5a5] text-black">+/-</button>
          <button className="btn-ios bg-[#a5a5a5] text-black">%</button>
          <button onClick={() => setDisplay(prev => prev + '÷')} className="btn-ios bg-[#ff9f0a] text-white text-3xl">÷</button>

          <button onClick={() => handleInput(7)} className="btn-ios bg-[#333333] text-white">7</button>
          <button onClick={() => handleInput(8)} className="btn-ios bg-[#333333] text-white">8</button>
          <button onClick={() => handleInput(9)} className="btn-ios bg-[#333333] text-white">9</button>
          <button onClick={() => setDisplay(prev => prev + '×')} className="btn-ios bg-[#ff9f0a] text-white text-3xl">×</button>

          <button onClick={() => handleInput(4)} className="btn-ios bg-[#333333] text-white">4</button>
          <button onClick={() => handleInput(5)} className="btn-ios bg-[#333333] text-white">5</button>
          <button onClick={() => handleInput(6)} className="btn-ios bg-[#333333] text-white">6</button>
          <button onClick={() => setDisplay(prev => prev + '-')} className="btn-ios bg-[#ff9f0a] text-white text-4xl">−</button>

          <button onClick={() => handleInput(1)} className="btn-ios bg-[#333333] text-white">1</button>
          <button onClick={() => handleInput(2)} className="btn-ios bg-[#333333] text-white">2</button>
          <button onClick={() => handleInput(3)} className="btn-ios bg-[#333333] text-white">3</button>
          <button onClick={() => setDisplay(prev => prev + '+')} className="btn-ios bg-[#ff9f0a] text-white text-3xl">+</button>

          <button onClick={() => handleInput(0)} className="btn-ios bg-[#333333] text-white col-span-2 !w-full !rounded-[100px] px-8 flex items-center justify-start">0</button>
          <button onClick={() => setDisplay(prev => prev + ',')} className="btn-ios bg-[#333333] text-white font-medium">,</button>
          <button onClick={calculate} className="btn-ios bg-[#ff9f0a] text-white text-3xl">=</button>
        </div>
      </div>

      <style jsx>{`
        .btn-ios {
          @apply h-[78px] w-[78px] rounded-full text-3xl flex items-center justify-center transition-all active:brightness-150 active:scale-95;
        }
      `}</style>
    </div>
  );
};

export default PhoneCalculator;