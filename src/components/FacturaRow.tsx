import React, { useState, useEffect } from "react";

interface Props {
	id?: string;
	amount: number;
	organization_id?: string;
	currency: string;
	type?: string;
	reference?: string;
	handle_sel?: () => void;
	selected_factura?: string;
}
export const FacturaRow = ({
	id,
	amount,
	organization_id,
	currency,
	type,
	reference,
	handle_sel,
	selected_factura,
}: Props) => {
	const [recieved, setRecieved] = useState(type === "received");
	console.log(handle_sel);

	var clp = 0;
	var usd = 0;

	if (currency === "CLP") {
		clp = amount;
		usd = clp * 0.001;
	} else if (currency === "USD") {
		usd = amount;
		clp = usd * 1000;
	}

	return (
		<span>
			{recieved ? (
				<div className="flex border border-sm border-gray-100 py-2 items-center">
					<input type="radio" name="button_factura" onClick={handle_sel} />
					<p className="pl-4 w-64 text-sm">{id}</p>
					<p className="w-64 text-xs">{`$ ${clp} CLP ($ ${usd}) USD`}</p>
					<p className="w-44 text-sm">Recibida</p>
				</div>
			) : null}
		</span>
	);
};
