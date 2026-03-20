import React, { useState, useEffect, useRef } from "react";


export default function RangeSlider({
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue = [min, max],
  onChange,
  marks = [],
  showTooltip = true,
  disabled = false,
  className = "",
  trackClassName = "",
  thumbClassName = "",
}) {
  const isControlled = controlledValue !== undefined;
  const [value, setValue] = useState(
    isControlled ? controlledValue : defaultValue
  );

  useEffect(() => {
    if (isControlled) setValue(controlledValue);
  }, [controlledValue]);

  const [minVal, maxVal] = value;

  function updateValue(newVal) {
    if (!isControlled) setValue(newVal);
    if (onChange) onChange(newVal);
  }

  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), maxVal - step);
    updateValue([newMin, maxVal]);
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), minVal + step);
    updateValue([minVal, newMax]);
  };

  const minPercent = ((minVal - min) / (max - min)) * 100;
  const maxPercent = ((maxVal - min) / (max - min)) * 100;

  return (
    <div className={`w-full relative py-6 ${className}`}>
      {/* Track */}
      <div className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 rounded-full bg-gray-200 ${trackClassName}`} />
      <div
        className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full bg-indigo-500"
        style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
      />

      {/* Marks */}
      {marks && marks.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 flex justify-between">
          {marks.map((m) => {
            const left = ((m - min) / (max - min)) * 100;
            return (
              <div
                key={m}
                className="flex flex-col items-center"
                style={{ left: `${left}%`, transform: "translateX(-50%)", position: "absolute" }}
              >
                <div className="w-1 h-3 bg-gray-400 rounded"></div>
                <div className="text-xs text-gray-500 mt-1">{m}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Min Input */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minVal}
        onChange={handleMinChange}
        disabled={disabled}
        className="absolute inset-0 w-full h-full appearance-none bg-transparent pointer-events-auto"
      />

      {/* Max Input */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxVal}
        onChange={handleMaxChange}
        disabled={disabled}
        className="absolute inset-0 w-full h-full appearance-none bg-transparent pointer-events-auto"
      />

      {/* Custom Thumbs */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full shadow-md bg-white border border-gray-300 ${thumbClassName}`}
        style={{ left: `${minPercent}%`, transform: "translate(-50%, -50%)" }}
      >
        {showTooltip && (
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-md text-xs font-medium bg-gray-800 text-white">
            {minVal}
          </div>
        )}
      </div>

      <div
        className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full shadow-md bg-white border border-gray-300 ${thumbClassName}`}
        style={{ left: `${maxPercent}%`, transform: "translate(-50%, -50%)" }}
      >
        {showTooltip && (
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-md text-xs font-medium bg-gray-800 text-white">
            {maxVal}
          </div>
        )}
      </div>
    </div>
  );
}

