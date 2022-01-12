export default function ErrorBanner({
  message = '에러입니다.',
}: {
  message?: string;
}) {
  return (
    <div
      data-testid='error-banner'
      style={{ backgroundColor: 'red', color: 'white' }}
    >
      {message}
    </div>
  );
}
