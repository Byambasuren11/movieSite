import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Paginations = (props: { onClick: any; page:string}) => {
  const { onClick, page } = props;

  return (
    <>
      <Pagination className="w-full flex justify-end mb-20">
        <PaginationContent>
          <PaginationItem> 
            <PaginationPrevious  />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink >{Number(page)-1}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink className="bg-gray-100 dark:bg-gray-800" >{Number(page)}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink >{Number(page)+1}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={onClick} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};
export default Paginations;
