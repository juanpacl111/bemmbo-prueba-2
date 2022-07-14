import React, { useState, useEffect } from "react";
import axios from "axios";
import { FacturaRow } from "../components/FacturaRow";
import { CreditNoteRow } from "../components/CreditNoteRow";
import { confirmAlert } from "react-confirm-alert";
import { CreditAlert } from "../components/CreditAlert";

export const FacturaTable = () => {
	const [facturas, setFacturas] = useState([
		[
			{
				id: "inv_MRlj0lt95XyQjvPY",
				amount: 40000000,
				organization_id: "piedpiper",
				currency: "CLP",
				type: "received",
			},
			{
				id: "inv_KedI7Yt22XM64129",
				amount: 16000,
				currency: "USD",
				organization_id: "piedpiper",
				type: "received",
			},
			{
				id: "inv_QerT7Yt22XM64MN3",
				amount: 4000000,
				currency: "CLP",
				organization_id: "piedpiper",
				type: "credit_note",
				reference: "inv_KedI7Yt22XM64129",
			},
			{
				id: "inv_012mGPt6Vb2w49GR",
				amount: 800,
				currency: "USD",
				organization_id: "piedpiper",
				type: "credit_note",
				reference: "inv_KedI7Yt22XM64129",
			},
			{
				id: "inv_nDAprkt7D0LKjkE2",
				amount: 80000,
				currency: "USD",
				organization_id: "octopus",
				type: "received",
			},
			{
				id: "inv_JitErYt22XM64MN3",
				amount: 40000,
				currency: "CLP",
				organization_id: "octopus",
				type: "credit_note",
				reference: "inv_nDAprkt7D0LKjkE2",
			},
		],
	]);

	const [factura_amount, setFacturaAmount] = useState(0);
	const [credit_note_amount, setCreditNoteAmount] = useState(0);

	const [facturaSelected, setFacturaSelected] = useState("");
	const [creditNoteSelected, setIsCreditNoteSelected] = useState("");

	const [showAssignButton, setShowAssignButton] = useState(true);
	const [showKeepAssigningButton, setShowKeepAssigningButton] = useState(false);

	const handle_factura_selected = (
		id: string,
		factura_amount: number,
		currency: string
	) => {
		if (facturaSelected !== id) {
			setIsCreditNoteSelected("");
			setShowKeepAssigningButton(false);
		}
		setFacturaSelected(id);

		var clp = 0;
		var usd = 0;

		if (currency === "CLP") {
			clp = factura_amount;
			usd = clp * 0.001;
		} else if (currency === "USD") {
			usd = factura_amount;
			clp = usd * 1000;
		}
		setFacturaAmount(clp);
	};

	const handle_credit_note_selected = (
		id: string,
		factura_amount: number,
		currency: string
	) => {
		setIsCreditNoteSelected(id);
		setShowKeepAssigningButton(false);
		setShowAssignButton(false);

		var clp = 0;
		var usd = 0;

		if (currency === "CLP") {
			clp = factura_amount;
			usd = clp * 0.001;
		} else if (currency === "USD") {
			usd = factura_amount;
			clp = usd * 1000;
		}
		setCreditNoteAmount(clp);
	};

	const handle_assign_button = () => {
		setShowAssignButton(true);
		setShowKeepAssigningButton(true);
	};

	const handle_assign_more_button = () => {
		setShowAssignButton(false);
		setShowKeepAssigningButton(false);
	};

	return (
		<div className="flex flex-col items-center">
			<div className="pt-8">Selecciona una factura</div>
			{facturas[0].map((factura) => (
				<FacturaRow
					{...factura}
					handle_sel={() =>
						handle_factura_selected(
							factura.id,
							factura.amount,
							factura.currency
						)
					}
					key={factura.id}
				/>
			))}

			{facturaSelected !== "" ? (
				<div className="items-center flex flex-col">
					<div className="pt-8">Selecciona una nota de crédito</div>
					{facturas[0].map((factura) => (
						<CreditNoteRow
							{...factura}
							selected_factura={facturaSelected}
							key={factura.id}
							handle_credit_note_selected={() =>
								handle_credit_note_selected(
									factura.id,
									factura.amount,
									factura.currency
								)
							}
						/>
					))}
					{creditNoteSelected !== "" && !showAssignButton ? (
						<button
							className="Asignar rounded-lg bg-blue-600 p-4 my-2 text-white"
							onClick={handle_assign_button}
						>
							Asignar
						</button>
					) : null}
				</div>
			) : null}
			{showKeepAssigningButton ? (
				<CreditAlert
					handle_click={() => handle_assign_more_button()}
					factura_amount={factura_amount}
					credit_note_amount={credit_note_amount}
				/>
			) : null}
		</div>
	);
};
