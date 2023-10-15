export default function NotFound(): JSX.Element {
  return (
    <div className="flex flex-col items-center w-full p-16 h-screen">
      <h2 className="text-4xl font-bold text-center">
        <span className="text-primary mr-4">🤷‍♂️</span>
        Error 404
      </h2>
      <hr className="w-3/4 border-input border-1 my-4 border-primary-foreground" />
      <p>La página que buscas no existe o no tienes permisos para acceder.</p>
    </div>
  );
}
