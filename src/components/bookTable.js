import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

async function getBooks(search, page, limit) {
  return await axios.get(
    `https://openlibrary.org/search.json?q=${search}&page=${page}&limit=${limit}`
  );
}

function BookTable() {
  const [search, setSearch] = useState("dream");

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortModel, setSortModel] = useState([]);
  const [count, setCount] = useState(0);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 1,
  });
  const limit = paginationModel.pageSize;
  const page = paginationModel.page;

  useEffect(() => {
    setLoading(true);
    getBooks(search, page, limit).then((data) => {
      setCount(data.data.numFound);
      const booksData = data.data.docs.map((book, index) => {
        return {
          id: index,
          title: book.title,
          author_name: book.author_name
            ? book.author_name.join(", ")
            : "Unknown",
          first_publish_year: book.first_publish_year || "N/A",
          subject: book.subject ? book.subject.join(", ") : "N/A",
          ratings_average: book.ratings_average || "N/A",
          author_birth_date: book.birth_date || "N/A",
          author_top_work: book.top_work || "N/A",
        };
      });
      setBooks(booksData);
      setLoading(false);
    });
  }, [limit, page, search]);

  const columns = [
    {
      field: "title",
      headerName: "Title",
      headerClassName: "super-app-theme--header",
      flex: 1,
      sortable: true,
    },
    {
      field: "author_name",
      headerName: "Author Name",
      headerClassName: "super-app-theme--header",
      flex: 1,
      sortable: true,
    },
    {
      field: "first_publish_year",
      headerName: "First Publish Year",
      headerClassName: "super-app-theme--header",
      flex: 1,
      sortable: true,
    },
    { field: "subject", headerName: "Subject", flex: 1, sortable: true },
    {
      field: "ratings_average",
      headerName: "Ratings Average",
      headerClassName: "super-app-theme--header",
      flex: 1,
      sortable: true,
    },
    {
      field: "author_birth_date",
      headerName: "Author Birth Date",
      headerClassName: "super-app-theme--header",
      flex: 1,
      sortable: true,
    },
    {
      field: "author_top_work",
      headerName: "Author Top Work",
      headerClassName: "super-app-theme--header",
      flex: 1,
      sortable: true,
    },
  ];
  return (
    <div style={{ height: 700, width: "100%" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearch(e.target[0].value);
        }}
      >
        <input
          placeholder="Search for books..."
          style={{ width: "90%", padding: 10, marginBottom: 10 }}
          type="text"
        />
      </form>
      <DataGrid
        sx={{
          maxHeight: 631,
          minHeight: 200,
          "& .super-app-theme--header": {
            fontWeight: "bold",
          },
        }}
        rows={books}
        columns={columns}
        loading={loading}
        pagination
        rowCount={count}
        pageSize={limit}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 50, 100]}
        onPaginationModelChange={(newPaginationModel) => {
          setPaginationModel({
            ...newPaginationModel,
            page: newPaginationModel.page + 1,
          });
        }}
        paginationMode="server"
        sortModel={sortModel}
        onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
      />
    </div>
  );
}

export default BookTable;
