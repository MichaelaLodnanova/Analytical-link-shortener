import { AttachmentIcon, DeleteIcon } from '@chakra-ui/icons';
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
  Switch,
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
import { DateLessLink } from 'common';
import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Paginator } from '../../../common/paginator';
import { useAllLink } from '../../../hooks/useAllLinks';
import useDeleteLink from '../../../hooks/useDeleteLink';
import useUpdateLink from '../../../hooks/useUpdateLink';
import { useUser } from '../../../hooks/useUser';

const limit = 8;

export function LinksTable() {
  const [pageNumber, setPageNumber] = useState(0);
  const [toDelete, setToDelete] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const navigate = useNavigate();

  const { deleteAd } = useDeleteLink();
  const { update } = useUpdateLink();

  const user = useUser();
  const { links, isFetching } = useAllLink({
    limit: limit,
    offset: pageNumber * limit,
    userId:
      user.authorized && !user.hasRole('ADMIN') ? user.user.id : undefined,
  });

  const columns = useMemo<ColumnDef<DateLessLink>[]>(
    () => [
      {
        header: 'Detail',
        cell: (row) => (
          <ButtonGroup>
            <IconButton
              as={AttachmentIcon}
              size="xs"
              variant="ghost"
              aria-label="Detail link"
              onClick={() => {
                navigate(`/auth/link-stats/${row.row.original.id}`);
              }}
            />
          </ButtonGroup>
        ),
      },
      {
        header: 'Url',
        footer: (props) => props.column.id,
        cell: (info) => info.getValue(),
        accessorKey: 'url',
      },
      {
        header: 'Short Url',
        footer: (props) => props.column.id,
        accessorKey: 'shortId',
      },
      {
        header: 'Ads Enabled',
        cell: (row) => (
          <ButtonGroup>
            <Switch
              isChecked={row.row.original.isAdvertisementEnabled}
              onChange={() =>
                update({
                  id: row.row.original.id,
                  isAdvertisementEnabled:
                    !row.row.original.isAdvertisementEnabled,
                })
              }
            />
          </ButtonGroup>
        ),
      },
      {
        header: 'Delete',
        cell: (row) => (
          <ButtonGroup>
            <IconButton
              as={DeleteIcon}
              colorScheme="red"
              variant="ghost"
              size="xs"
              aria-label="Delete link"
              onClick={() => {
                setToDelete(row.row.original.id);
                onOpen();
              }}
            />
          </ButtonGroup>
        ),
      },
    ],
    [onOpen, navigate, update]
  );

  const table = useReactTable({
    data: links?.data.links ?? [],
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
              Delete Link
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
