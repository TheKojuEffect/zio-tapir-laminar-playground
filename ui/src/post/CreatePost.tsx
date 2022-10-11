import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {Controller, useForm} from 'react-hook-form';
import Box from "@mui/material/Box";
import {useRouter} from "next/router";
import {FC} from "react";
import {StateSelect} from "../nav/StateSelect";
import {StateCode} from "../nav/State";

type CreatePostDto = {
    title: string,
    message?: string,
    state: StateCode,
};

export const CreatePost: FC = () => {
    const router = useRouter();
    const goToPosts = () => router.push('/');

    const {register, handleSubmit, control, formState: {errors}} = useForm<CreatePostDto>();
    const onSubmit = (data: CreatePostDto) =>
        fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            }
        )
            .then(goToPosts)

    return (
        <Box
            sx={{
                mx: 2,
                mt: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography component="h1" variant="h5">
                Create a post
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Title"
                            autoFocus
                            {...register('title', {required: true, minLength: 3})}
                            error={!!errors.title}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            multiline
                            rows={4}
                            fullWidth
                            label="Message"
                            {...register('message')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="state"
                            control={control}
                            rules={{required: true}}
                            defaultValue={undefined}
                            render={
                                ({field: {onChange}}) =>
                                    <StateSelect
                                        error={!!errors.state}
                                        onChange={(state) => {
                                            onChange(state)
                                        }}/>
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            type="reset"
                            fullWidth
                            variant="outlined"
                            color="primary"
                            sx={{mt: 3, mb: 2}}
                            onClick={router.back}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{mt: 3, mb: 2}}
                        >
                            Post
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
