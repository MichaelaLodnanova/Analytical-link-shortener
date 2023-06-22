import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonGroup,
  IconButton,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { DateLessAdvertisement } from 'common';
import { useMemo, useRef, useState } from 'react';

import { Paginator } from '../../../common/paginator';
import { useAllAdvertisements } from '../../../hooks/useAllAdvertisements';
import useDeleteAdvertisement from '../../../hooks/useDeleteAdvertisement';
import { useUser } from '../../../hooks/useUser';

const limit = 8;

export function AdvertisementTable() {
  const [pageNumber, setPageNumber] = useState(0);
  const [toDelete, setToDelete] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const { deleteAd } = useDeleteAdvertisement();

  const user = useUser();
  const { advertisements, isFetching } = useAllAdvertisements({
    limit: limit,
    offset: pageNumber * limit,
    userId:
      user.authorized && !user.hasRole('ADMIN') ? user.user.id : undefined,
  });

  const columns = useMemo<ColumnDef<DateLessAdvertisement>[]>(
    () => [
      {
        header: 'Title',
        footer: (props) => props.column.id,
        cell: (info) => info.getValue(),
        accessorKey: 'title',
      },
      {
        header: 'Ad Url',
        footer: (props) => props.column.id,
        accessorKey: 'adUrl',
      },
      {
        header: 'Forward Url',
        footer: (props) => props.column.id,
        accessorKey: 'forwardUrl',
      },
      {
        header: 'Edit',
        cell: (row) => (
          <ButtonGroup>
            <IconButton
              as={EditIcon}
              size="xs"
              aria-label="Edit advertisement"
              onClick={() => alert(row.row.original.id)}
            />
            <IconButton
              as={DeleteIcon}
              colorScheme="red"
              size="xs"
              aria-label="Delete advertisement"
              onClick={() => {
                setToDelete(row.row.original.id);
                onOpen();
              }}
            />
          </ButtonGroup>
        ),
      },
    ],
    [onOpen]
  );

  const table = useReactTable({
    data: advertisements?.data.advertisements ?? [],
    columns,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <TableContainer>
        <Table variant="striped">
          <TableCaption>
            <Paginator
              isLoading={isFetching}
              pageNumber={pageNumber}
              onChange={setPageNumber}
            />
          </TableCaption>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <AlertDialog
        isOpen={isOpen}
        /* eslint-disable-next-line */
        /* @ts-ignore */
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Advertisement
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deleteAd(toDelete);
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
