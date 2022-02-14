import { Box, Card, CardActions, CardContent, CardHeader, Grid, Typography } from "@mui/material";

const Cartao = ({title, text, description}) => {
    return (
        <Grid
              item
              key={title}
              
            >
              <Card>
                <CardHeader
                  title={title}
                  titleTypographyProps={{ align: 'center', textAlign: 'center', alignItems: 'center' }}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography style={{textAlign: 'center'}} component="h3" variant="h5" color="text.primary">
                      {text}
                    </Typography>
                    
                  </Box>
                    {description.map((line) => (
                      <Typography
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                </CardContent>
              </Card>
            </Grid>
    );
}

export default Cartao;