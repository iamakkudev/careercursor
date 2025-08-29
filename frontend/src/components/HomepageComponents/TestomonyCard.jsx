const TestomonyCard = () => {
  return (
    <li className='w-[15rem] bg-white text-violet-700 hover:bg-violet-700 group hover:text-white hover-anime h-[80%] rounded-2xl p-4 border-2 shrink-0'>
            <div className=" font-light"><span className=" text-3xl font-serif shrink-2">"</span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos unde corrupti nisi natus ipsa quidem perferendis impedit voluptas quae ab soluta ut, libero eaque corporis!</div>
            <div className="mt-3 flex items-center gap-3">
              <img src="/avatar.png" alt="" className="size-8 rounded-full border-2 border-violet-700 group-hover:border-white " />
              <div>
                <div className=" font-semibold -mb-1">John doe</div>
                <div className=" text-xs font-light">engineer</div>
              </div>
            </div>
    </li>
  )
}

export default TestomonyCard