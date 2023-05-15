import { useState } from 'react';

const CopyCode = ({ code }: {code: any}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (code: string) => {
    console.log('Code: ', code)
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <pre className='relative wp-block-code'>
        <code>{code}</code>
        <button className={`absolute top-2 right-4 ${copied && 'text-green-400'}`} onClick={() => handleCopy(code)}>
            {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </pre>
    </>
  );
};

export default CopyCode;