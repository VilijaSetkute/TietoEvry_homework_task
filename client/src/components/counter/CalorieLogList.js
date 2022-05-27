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
    <div className="text-small">
      <div>{timePassed(log.timestamp)}</div>
      <div className={log.color}>
        Body mass index -
        {log.bmi}
        .
        {log.bmiEval}
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
      <hr />
    </div>
  );
}

export default CalorieLogList;
