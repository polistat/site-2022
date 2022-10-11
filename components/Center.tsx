
export default function Center(props:any) {
  return <>
    <div className="w-full h-fit overflow-x-auto overflow-y-hidden">
      <div className="w-full min-w-fit flex justify-center" {...props}/>
    </div>
  </>;
}
