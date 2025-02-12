"use client";

import {MantineReactTable, MRT_ColumnDef, useMantineReactTable} from 'mantine-react-table';
import {useMemo, useState} from "react";
import {PlantData} from "@/app/types";
import {ActionIcon, Box} from '@mantine/core';
import {
	IconEdit,
	IconTrash,
	IconBucketDroplet,
} from '@tabler/icons-react';
import {removePlant, waterPlant} from "@/app/utils/localStorageService";
import PlantForm from "@/app/_components/plantForm/plantForm";
import {formatDate} from "@/app/utils/dateUtils";
import {getWateringStatus} from "@/app/helpers/getWateringStatus";
import {DAYS_BETWEEN_WATERING_DEFAULT} from "@/app/constants";

interface PlantsListProps {
	data: PlantData[];
	refreshData: () => void;
}

const PlantsList = ({data, refreshData}: PlantsListProps) => {
	const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
	const [currentId, setCurrentId] = useState<string>(null);

	const handleAddPlant = () => {
		setCurrentId(null);
		setIsFormVisible(true);
	}

	const handleCloseForm = () => {
		setIsFormVisible(false);
		refreshData();
	}

	const handleRemovePlant = (id: string) => {
		removePlant(id);
		refreshData();
	}

	const handleWaterPlant = (id: string) => {
		waterPlant(id);
		refreshData();
	}

	const handleEditPlant = (id: string) => {
		setCurrentId(id);
		setIsFormVisible(true);
	}

	const columns = useMemo<MRT_ColumnDef<PlantData>[]>(() => [
			{
				accessorKey: 'name',
				header: 'Plant name',
			},
			{
				accessorKey: 'lastWatered',
				header: 'Watering status',
				Cell: ({cell}) => {
					const lastWatered = formatDate(cell.getValue() as string | undefined);
					const daysBetweenWatering = cell.row.original.daysBetweenWatering ?? DAYS_BETWEEN_WATERING_DEFAULT;
					return getWateringStatus(lastWatered, daysBetweenWatering);
				}
			},
			{
				accessorKey: 'location',
				header: 'Location',
			},
			{
				accessorKey: 'visibleState',
				header: 'Visible state',
			},
			{
				accessorKey: 'description',
				header: 'Description',
			},
		], []
	);

	const table = useMantineReactTable({
		columns,
		data,
		getRowId: (row) => row.id,
		enableRowSelection: false,
		enableColumnOrdering: false,
		enableGlobalFilter: true,
		enableColumnActions: false,
		enableFullScreenToggle: false,
		enableColumnFilterModes: false,
		enableHiding: false,
		enableDensityToggle: false,
		enableRowActions: true,
		renderRowActions: ({row}) => (
			<Box sx={{display: 'flex', flexWrap: 'nowrap', gap: '8px'}}>
				<ActionIcon
					color="green"
					onClick={() => {
						handleEditPlant(row.original.id);
					}}
				>
					<IconEdit/>
				</ActionIcon>
				<ActionIcon
					color="red"
					onClick={() => {
						handleRemovePlant(row.original.id);
					}}
				>
					<IconTrash/>
				</ActionIcon>
				<ActionIcon
					color="blue"
					onClick={() => {
						handleWaterPlant(row.original.id);
					}}
				>
					<IconBucketDroplet/>
				</ActionIcon>
			</Box>
		),
	});

	return (
		<div>
			<div className="flex justify-end mb-4 mt-4 mr-4">
				<button onClick={handleAddPlant}
				        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200">Add
					plant
				</button>
			</div>

			{isFormVisible && (
				<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
					<PlantForm onClose={handleCloseForm} id={currentId}/>
				</div>
			)}

			<MantineReactTable table={table}/>
		</div>
	)
		;
}

export default PlantsList;