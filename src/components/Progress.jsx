import React from 'react';
import { ProgressBarContainer,ProgressBar, ProgressDone } from '../assets/styled-components/ProgressContainer';
import { Image } from '../assets/styled-components/global/style';

const Progress = ({images, progressBars}) => {
  return (
    <ProgressBarContainer>
      {progressBars &&
        progressBars.map((bar,index) => (
          <ProgressBar
          key={index}
            style={{
              width: images
                ? images.length === 1
                  ? "100%"
                  : `${100 / (images.length - 1)}%`
                : "0%",
            }}
          >
            <ProgressDone style={{ width: `${bar.progress}%` }}
            ></ProgressDone>
            {bar.progress === 0 && (
              <Image
                src={bar.image}
                alt={`Image ${bar.id}`}
                width={600}
                height={600}
              />
            )}
          </ProgressBar>
        ))}
    </ProgressBarContainer>
  )
}

export default Progress;
