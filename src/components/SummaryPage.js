import React from 'react'

export default function SummaryPage(props) {
    console.log('THIS LOADED');
    console.log(props.summaryArray);
  return (
    <div>
        <h1>{props.summaryArray[0].title}</h1>
    </div>
  )
}
