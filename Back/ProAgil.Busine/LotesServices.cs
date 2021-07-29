using AutoMapper;
using ProAgil.Business.Interfaces;
using ProAgil.Domain;
using ProAgil.Domain.Dtos;
using ProAgil.Repository;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ProAgil.Business
{
    public class LotesServices : ILotesServices
    {
        private readonly IProAgilRepository _proAgilRepository;
        private readonly ILotesRepository _lotesRepository;
        private readonly IMapper _mapper;

        public LotesServices(IProAgilRepository proAgilRepository, ILotesRepository lotesRepository, IMapper mapper)
        {
            _proAgilRepository = proAgilRepository;
            _lotesRepository = lotesRepository;
            _mapper = mapper;
        }

        public async Task<LoteDto> GetLoteByIdsAsync(int eventoId, int loteId)
        {
            try
            {
                var lote = await _lotesRepository.GetLoteByIdsAsync(eventoId, loteId);
                if (lote == null) return null;

                return _mapper.Map<LoteDto>(lote);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
        public async Task<LoteDto[]> GetLotesByEventoIdAsync(int eventoId)
        {
            try
            {
                var lotes = await _lotesRepository.GetLotesByEventoIdAsync(eventoId);
                if (lotes == null) return null;

                return _mapper.Map<LoteDto[]>(lotes);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task AddLote(int eventoId, LoteDto model)
        {
            try
            {
                var lote = _mapper.Map<Lote>(model);
                lote.EventoId = eventoId;
                _proAgilRepository.Add<Lote>(lote);
                await _proAgilRepository.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public async Task UpdateLote(int eventoId, LoteDto model)
        {
            try
            {
                var lote = _lotesRepository.GetLoteByIdsAsync(eventoId, model.Id);
                model.EventoId = eventoId;
                await _mapper.Map(model, lote);
                _proAgilRepository.Update<Lote>(lote.Result);
                await _proAgilRepository.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public async Task<LoteDto[]> SaveLotesAsync(int eventoId, LoteDto[] models)
        {
            try
            {
                var lotes = _lotesRepository.GetLotesByEventoIdAsync(eventoId);
                if (lotes == null) return null;

                foreach (var model in models)
                {
                    if (model.Id == 0)
                    {
                        await AddLote(eventoId, model);
                    }
                    else
                    {
                        await UpdateLote(eventoId, model);
                    }
                }

                var result = await _lotesRepository.GetLotesByEventoIdAsync(eventoId);
                return _mapper.Map<LoteDto[]>(result);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteLoteAsync(int eventoId, int loteId)
        {
            try
            {
                var lote = await _lotesRepository.GetLoteByIdsAsync(eventoId, loteId);
                if (lote == null) throw new Exception("Lote para delete não encontrado.");

                _proAgilRepository.Delete<Lote>(lote);
                return await _proAgilRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }




    }
}
