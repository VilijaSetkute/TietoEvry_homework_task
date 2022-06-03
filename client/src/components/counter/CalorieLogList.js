import React from 'react';

function CalorieLogList({ log }) {
  function timePassed(time) {
    return new Intl.DateTimeFormat(
      'Lt-lt',
      {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      },
    ).format(time);
  }

  return (
    <div>
      <div className="d-flex">
        <div className={`log-circle fs-5 me-3 ${log.color}`}>
          {Math.round(log.bmi)}
        </div>
        <div className="text-small">
          <div>{timePassed(log.timestamp)}</div>
          <div className={log.color}>
            {log.bmiEval}
            . Your BMI -
            {log.bmi}
          </div>
          <div>
            Basal metabolic rate -
            {log.bmr}
            {' '}
            kcal. Total energy expenditure -
            {log.totalBmr}
            {' '}
            kcal
          </div>
        </div>
      </div>
      <hr className="my-4" />
    </div>

  );
}

export default CalorieLogList;
