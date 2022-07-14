import React, { useState, useEffect } from "react";
import { CheckIcon } from "@heroicons/react/solid";

interface Props {
	handle_click: () => void;
	factura_amount: number;
	credit_note_amount: number;
}
export const CreditAlert = ({
	handle_click,
	factura_amount,
	credit_note_amount,
}: Props) => {
	console.log(handle_click);
	return (
		<span>
			<div className="h-96 w-64 flex flex-col border-2 items-center space-y-3">
				<CheckIcon className="w-20 rounded-full p-2 bg-green-500 mt-4" />
				<div className="mx-auto flex flex-col items-center text-center">
					Nota de crédito asignada correctamentdssde
				</div>
				<button
					className="w-44 h-14 bg-blue-600 rounded-xl text-white"
					onClick={handle_click}
				>
					Seguir asignando
				</button>
				<h4 className="mx-auto flex flex-col text-center">
					Pagaste una factura de ${factura_amount.toLocaleString("en-US")} CLP
					con una nota de crédito de $
					{credit_note_amount.toLocaleString("en-US")}; quedándote un total de $
					{Math.max(0, factura_amount - credit_note_amount).toLocaleString(
						"en-US"
					)}{" "}
					CLP por pagar
					{factura_amount - credit_note_amount < 0
						? `con ${(credit_note_amount - factura_amount).toLocaleString(
								"en-US"
						  )} a favor`
						: ""}
				</h4>
			</div>
		</span>
	);
};
