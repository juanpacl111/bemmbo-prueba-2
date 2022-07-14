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
	handle_credit_note_selected: () => void;
}
export const CreditNoteRow = ({
	id,
	amount,
	organization_id,
	currency,
	type,
	reference,
	handle_sel,
	selected_factura,
	handle_credit_note_selected,
}: Props) => {
	const [isCreditNote, setIsCreditNote] = useState(type === "credit_note");

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
			{isCreditNote && reference === selected_factura ? (
				<div className="flex border border-sm border-gray-100 py-2 items-center">
					<input
						type="radio"
						name="button_credit_note"
						onClick={handle_credit_note_selected}
					/>
					<p className="pl-4 w-64 text-sm">{id}</p>
					<p className="w-64 text-xs">{`$ ${clp} CLP ($ ${usd}) USD`}</p>
					<p className="w-44 text-sm">{reference}</p>
				</div>
			) : null}
		</span>
	);
};
