// import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const Form = (props) => {
	const { register, handleSubmit, formState: { errors },
		// setError, clearErrors 
	} = useForm();
	const { onSubmit, title } = props;
	register("customError");
	// const watchAll = watch();

	const validStyle = "mt-1 appearance-none border-b-2 border-dashed	border-b-gray-500 bg-transparent focus:outline-none"
	const inValidStyle = "mt-1 appearance-none border-b-2 border-dashed	border-b-red-500 bg-transparent focus:outline-none"

	// useEffect(() => {
	// 	clearErrors();
	// 	if (errorMessage.email || errorMessage.password) {
	// 		setError("customError", { type: "custom", message: errorMessage.message })
	// 	}
	// }, [errorMessage])

	return (
		<motion.div
			initial={{ opacity: 0, x: -200 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 1, stiffness: 120, type: "spring" }}
		>
			<p className="text-3xl font-virgo text-center mt-5">{title}</p>
			<div className="container bg-neutral-50 border-slate-500/30 border-2 rounded-lg mx-auto my-5 p-10 max-w-xl font-mono">
				<p>{errors.customError && errors.customError.message}</p>
				<form onSubmit={handleSubmit(onSubmit)}
					className="autofill:outline-none flex justify-center text-2xl">
					{/* <div className="grid grid-cols-2 gap-2"> */}
					<div className="grid grid-cols-1 gap-10">
						<div>
							<span className="block font-semibold text-slate-700">Email</span>
							<input {...register("email", { required: true })}
								className={errors.email ? inValidStyle : validStyle} />
							<p>{errors.email && <span className="text-red-700 font-semibold">This field is required</span>}</p>

						</div>
						<div>
							<span className="block font-semibold text-slate-700">Password</span>
							<input {...register("password", { required: true })}
								className={errors.password ? inValidStyle : validStyle}
								type="password" />
							<p>{errors.password && <span className="text-red-700 font-semibold">This field is required</span>}</p>

						</div>
						<motion.input type="submit"
							initial={{ opacity: 0, scale: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ opacity: 0, scale: 0 }}
							transition={{ type: "spring", stiffness: 130, delay: 0.8 }}
							className="bg-transparent border-slate-500 border-2 flex-nowrap align
						rounded w-full max-w-lg mx-auto font-semibold text-slate-700 hover:bg-slate-500 hover:text-white transition-colors cursor-pointer" />
					</div>
					{/* </div> */}
				</form>
			</div>
		</motion.div>
	);
}

export default Form;