import * as React from 'react';

interface IDonut {
    percentage : number;
    date : string;
    money : string;
}

export const Donut = ({ percentage, date, money } : IDonut) => {

    const strokeWidth = 8;
	const radius = (50 - strokeWidth / 2);

    const pathDescription = `
      M 50,50 m 0,-${radius}
      a ${radius},${radius} 0 1 1 0,${2 * radius}
      a ${radius},${radius} 0 1 1 0,-${2 * radius}
    `;

    const diameter = Math.PI * 2 * radius;
    
    const progressStyle : React.CSSProperties = {
        stroke: 'rgba(40, 210, 214, 1)',
        strokeDasharray: `${diameter}% ${diameter}%`,
        strokeDashoffset: `${((100 - percentage) / 100 * diameter)}%`,
    };

    return (
        <svg className='Donut' viewBox="0 0 100 100">
            <path
                className="donut__internet"
                d={pathDescription}
                strokeWidth={strokeWidth}
                fillOpacity={0}
                style={{
                    stroke: 'rgba(255, 240, 90, 1)',
                }}
            />

            <path
                className="donut__money"
                d={pathDescription}
                strokeWidth={strokeWidth}
                fillOpacity={0}
                style={progressStyle}
            />

            <text className="donut__money" dominantBaseline='central' x={51} y={40}>
                {money} ₽
            </text>
            <text className='donut__date'  dominantBaseline='central' x={50} y={55}>
                {date} 
            </text>
      </svg>
    );
};
