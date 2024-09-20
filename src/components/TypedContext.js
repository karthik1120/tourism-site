import React, { useState, useEffect } from 'react';
import './TypedContext.css';

const travelContext = [
  'Wild-life safari',
  'Mountain Trekking',
  'Thrilling experience',
  'fun Activities',
  'meet strangers',
  'Adventure & more',
];
const Phase = {
  TYPING: 'TYPING',
  PAUSING: 'PAUSING',
  DELETING: 'DELETING',
};

const useTypedContext = (travelContext) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [typedContent, setTypedContent] = useState('');
  const [phase, setPhase] = useState(Phase.TYPING);
  useEffect(() => {
    switch (phase) {
      case Phase.TYPING: {
        const Value = travelContext[selectedIndex].slice(
          0,
          typedContent.length + 1,
        );

        if (Value === typedContent) {
          const timeTyped = setTimeout(() => {
            setPhase(Phase.PAUSING);
          }, 1500);
          return () => clearTimeout(timeTyped);
        }

        const timeTyped = setTimeout(() => {
          setTypedContent(Value);
        }, 100);
        return () => clearTimeout(timeTyped);
      }
      case Phase.DELETING: {
        if (!typedContent) {
          let nextInd = selectedIndex + 1;
          setSelectedIndex(travelContext[nextInd] ? nextInd : 0);
          setPhase(Phase.TYPING);
          return;
        }

        const Value = travelContext[selectedIndex].slice(
          0,
          typedContent.length - 1,
        );
        const timeTyped = setTimeout(() => {
          setTypedContent(Value);
        }, 30);
        return () => clearTimeout(timeTyped);
      }
      // case Phase.PAUSING:
      default:
        const timeTyped = setTimeout(() => {
          setPhase(Phase.DELETING);
        }, 100);
        return () => clearTimeout(timeTyped);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typedContent, phase]);

  return typedContent;
};

const TypedContext = () => {
  const typingContext = useTypedContext(travelContext);
  return <div className="cursor-style">{typingContext}</div>;
};

export default TypedContext;
