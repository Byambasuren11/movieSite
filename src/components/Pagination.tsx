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
          {Number(page)>1&&(
            <>
          <PaginationItem> 
            <PaginationPrevious  onClick={()=>onClick(Number(page)-1)}/>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink >{Number(page)-1}</PaginationLink>
          </PaginationItem>
          </>
          )}
          <PaginationItem>
            <PaginationLink className="bg-gray-100 dark:bg-gray-800" onClick={()=>onClick(page)}>{Number(page)}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={()=>onClick(page+1)}>{Number(page)+1}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={()=>onClick(Number(page)+1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};
export default Paginations;
