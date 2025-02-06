import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query';
import { Link as RouterLink } from '@tanstack/react-router'

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, CircularProgress, IconButton, Link, TablePagination } from '@mui/material';

import { fetchVoiceActors } from '../requests/profiles';

import '../index.css'
import { usePlayAudio } from '../hooks/usePlayAudio';
import { Pause } from '@mui/icons-material';
import { PlayArrow } from '@mui/icons-material';

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const [page, setPage] = useState(1)
  const [keywords, setKeywords] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const { isPending, isError, data, isFetching } = useQuery({
    queryKey: ['voiceActors', page, searchTerm],
    queryFn: () => fetchVoiceActors({ page, keywords: searchTerm }),
    keepPreviousData: true,
  })

  const { playingIndex, handlePlayPause } = usePlayAudio(isFetching)

  const handleSearch = () => {
    setPage(1)
    setSearchTerm(keywords)
  }

  if (isError) return <div>Error fetching data</div>
 
  return (
    <div className='container'>
        <Stack spacing={5} direction="row">
          <TextField 
            id="standard-basic" 
            label="Standard" 
            variant="standard" 
            size='small' 
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
          <Button 
            variant="contained" 
            size='small'
            onClick={handleSearch}
          >
            Search
          </Button>
        </Stack>
      <TableContainer component={Paper}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Avatar</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Voice</TableCell>
                <TableCell>Profile</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell colSpan={6} style={{ textAlign: "center" }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              data?.data?.providers.map((item, index) => (
                <TableRow key={item.user_id}>
                  <TableCell>{item.user_id}</TableCell>
                  <TableCell>
                    <Avatar alt="Remy Sharp" src={item.user?.picture_small} />
                  </TableCell>
                  <TableCell>
                    <Link href={`https://www.voice123.com/${item.user?.username}`} target='_blank'>
                      {item.user?.username}
                    </Link>
                  </TableCell>
                  <TableCell>{item.user?.name}</TableCell>
                  <TableCell>
                    {item.relevant_sample?.file ? (
                      <IconButton onClick={() => handlePlayPause(index, item.relevant_sample?.file)}>
                        {playingIndex === index ? <Pause /> : <PlayArrow />}
                      </IconButton>
                    ) : (
                      <span>No audio track</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Link component={RouterLink} to={`/profiles/${item.user_id}`}>
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
            </TableBody>
          </Table>
        </TableContainer>

        { !isPending && (
          <TablePagination
            component="div"
            count={data.totalRows}
            page={page - 1}
            rowsPerPage={data.pageSize}
            rowsPerPageOptions={[10]}
            onPageChange={(_, newPage) => setPage(newPage + 1)}
          />
        )} 
        
      </TableContainer>
    </div>
  );
}
