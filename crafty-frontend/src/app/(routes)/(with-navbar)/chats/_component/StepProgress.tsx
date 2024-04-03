const StepProgress = ({ step }: { step: number }) => {
  const steps = [
    {
      level: 1,
      name: 'Product Offer',
    },
    {
      level: 2,
      name: 'Payment',
    },
    {
      level: 3,
      name: 'Accept Payment',
    },
    {
      level: 4,
      name: 'In progress',
    },
    {
      level: 5,
      name: 'Confirmation',
    },
  ];

  return (
    <>
      <ul className="steps">
        {steps.map((s) => (
          <li key={s.level} className={`step ${step >= s.level ? 'step-accent' : ''}`}>
            <div className="text-sm font-normal">{s.name}</div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default StepProgress;
