const Button = ({children}: any) => {
    return(
        <button
            type="submit"
            className="inline-block rounded-lg bg-sky-500 px-4 py-2 mb-5 text-xs font-medium text-white hover:bg-sky-400 transition-all">
        <span className="block text-center">{children}</span>
      </button>
    )
}

export default Button