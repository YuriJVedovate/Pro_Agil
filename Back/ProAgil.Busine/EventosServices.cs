using AutoMapper;
using ProAgil.Business.Interfaces;
using ProAgil.Data.Interfaces;
using ProAgil.Domain;
using ProAgil.Domain.Dtos;
using ProAgil.Repository;
using System;
using System.Threading.Tasks;

namespace ProAgil.Business
{
    public class EventosServices : IEventosServices
    {
        private readonly IProAgilRepository _proAgilRepository;
        private readonly IEventosRepository _eventosRepository;
        private readonly IMapper _mapper;

        public EventosServices(IProAgilRepository proAgilRepository, IEventosRepository eventosRepository, IMapper mapper)
        {
            _proAgilRepository = proAgilRepository;
            _eventosRepository = eventosRepository;
            _mapper = mapper;
        }

        public async Task<EventoDto> AddEventos(EventoDto model)
        {
            try
            {
                var evento = _mapper.Map<Evento>(model);
                _proAgilRepository.Add<Evento>(evento);
                if (await _proAgilRepository.SaveChangesAsync()) return _mapper.Map<EventoDto>(await _eventosRepository.GetEventoByIdAsync(evento.Id, false));

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<EventoDto> UpdateEventos(int eventoId, EventoDto model)
        {
            try
            {
                var evento = await _eventosRepository.GetEventoByIdAsync(eventoId, false);
                if (evento == null) return null;

                model.Id = evento.Id;

                _mapper.Map(model, evento);
                _proAgilRepository.Update<Evento>(evento);
                if (await _proAgilRepository.SaveChangesAsync()) _mapper.Map<EventoDto>(await _eventosRepository.GetEventoByIdAsync(evento.Id, false));

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteEventos(int eventoId)
        {
            try
            {
                var evento = await _eventosRepository.GetEventoByIdAsync(eventoId, false);
                if (evento == null) throw new Exception("Evento para delete não encontrado.");

                //var result = _mapper.Map<EventoDto>(evento);
                _proAgilRepository.Delete(evento);
                return await _proAgilRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<EventoDto[]> GetAllEventoAsync(bool includePalestrantes = false)
        {
            try
            {
                var eventos = await _eventosRepository.GetAllEventoAsync(includePalestrantes);
                if (eventos == null) return null;
                var result = _mapper.Map<EventoDto[]>(eventos);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<EventoDto[]> GetAllEventoByTemaAsync(string tema, bool includePalestrantes = false)
        {
            try
            {
                var eventos = await _eventosRepository.GetAllEventoByTemaAsync(tema, includePalestrantes);
                if (eventos == null) return null;
                var result = _mapper.Map<EventoDto[]>(eventos);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<EventoDto> GetEventoByIdAsync(int EventoId, bool includePalestrantes = false)
        {
            try
            {
                var evento = await _eventosRepository.GetEventoByIdAsync(EventoId, includePalestrantes);
                if (evento == null) return null;
                var result = _mapper.Map<EventoDto>(evento);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
